import math
import requests
import json
from collections import defaultdict
from sentence_transformers import CrossEncoder

print("Chargement du Cross-Encoder en mémoire...")
reranker = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-6-v2")
print("Cross-Encoder prêt.")

def expand_query_with_mistral(user_query: str, mistral_api_key: str, n_queries: int = 3) -> list[str]:
    prompt = f"""You are a Steam game search optimization expert.
A user wants to find games matching: "{user_query}"

Generate exactly {n_queries} distinct search queries in English to find relevant games.
Rules:
- Each query must emphasize a DIFFERENT key aspect of the request
- Use Steam-specific vocabulary (tags, genres, mechanics)
- Be concise (5-10 words per query)
- Isolate the rarest/most specific criteria in at least one query

Return ONLY a valid JSON array of {n_queries} strings. No preamble, no explanation."""
    try:
        response = requests.post(
            "https://api.mistral.ai/v1/chat/completions",
            headers={"Authorization": f"Bearer {mistral_api_key}", "Content-Type": "application/json"},
            json={"model": "mistral-small-latest", "messages": [{"role": "user", "content": prompt}], "temperature": 0.3},
            timeout=15
        )
        response.raise_for_status()
        raw = response.json()["choices"][0]["message"]["content"].strip().replace("```json", "").replace("```", "").strip()
        queries = json.loads(raw)
        return queries[:n_queries] if isinstance(queries, list) else list(queries.values())[:n_queries]
    except Exception as e:
        print(f"⚠️ Mistral error: {e}")
        return [user_query]

def build_where_clause(required_tags: list[str] = None, max_price: float = None) -> dict | None:
    conditions = []
    if required_tags:
        tag_filters = [{"Tags": {"$contains": t}} for t in required_tags]
        conditions.append({"$or": tag_filters} if len(tag_filters) > 1 else tag_filters[0])
    if max_price is not None:
        conditions.append({"Price": {"$lte": str(max_price)}})
    if not conditions: return None
    return conditions[0] if len(conditions) == 1 else {"$and": conditions}

def sigmoid_percentage(score: float) -> str:
    adjusted_score = score + 10 
    proba = 1 / (1 + math.exp(-adjusted_score))
    return f"{round(proba * 100, 1)}%"

def gamepulse_search(user_query: str, collection, mistral_api_key: str = None, 
                     required_tags: list[str] = None, max_price: float = None, 
                     use_reranker: bool = True, top_k: int = 5) -> list[dict]:
    
    queries = expand_query_with_mistral(user_query, mistral_api_key) if mistral_api_key else [user_query]
    where_clause = build_where_clause(required_tags, max_price)
    
    n_candidates = max(top_k * 4, 20)
    rrf_scores = defaultdict(float)
    game_store = {}
    
    for query in queries:
        kwargs = {"query_texts": [query], "n_results": n_candidates}
        if where_clause: kwargs["where"] = where_clause
            
        results = collection.query(**kwargs)
        if not results['ids'][0]: continue

        for rank, (doc_id, metadata, document) in enumerate(zip(results['ids'][0], results['metadatas'][0], results['documents'][0])):
            rrf_scores[doc_id] += 1.0 / (60 + rank + 1)
            game_store[doc_id] = (metadata, document)

    if not rrf_scores: return []

    top_ids = sorted(rrf_scores, key=rrf_scores.get, reverse=True)[:n_candidates]
    
    if use_reranker:
        pairs = [(user_query, game_store[doc_id][1]) for doc_id in top_ids]
        scores = reranker.predict(pairs)
        ranked = sorted(zip(scores, top_ids), key=lambda x: x[0], reverse=True)[:top_k]
        
        return [{
            "name": game_store[doc_id][0].get('Name', 'Inconnu'), 
            "price": str(game_store[doc_id][0].get('Price', '0.0')), 
            "tags": game_store[doc_id][0].get('Tags', 'N/A'), 
            "score": sigmoid_percentage(float(score)),
            "description": game_store[doc_id][1].split("DESC: ")[-1][:200]
        } for score, doc_id in ranked]
    
    return []