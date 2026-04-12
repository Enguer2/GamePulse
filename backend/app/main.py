import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import chromadb
from chromadb.utils import embedding_functions
from dotenv import load_dotenv

from app.models import SearchRequest, SearchResult, GameResponse
from app.engine import gamepulse_search

load_dotenv()
MISTRAL_KEY = os.getenv("MISTRAL_API_KEY")

app = FastAPI(title="GamePulse API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

collection = None

@app.on_event("startup")
def startup_event():
    global collection
    print("Connexion à ChromaDB...")
    client = chromadb.PersistentClient(path="/app/data/chroma_db_full_v2")
    sentence_transformer_ef = embedding_functions.SentenceTransformerEmbeddingFunction(
        model_name="all-MiniLM-L6-v2"
    )
    collection = client.get_collection(
        name="gamepulse_collection",
        embedding_function=sentence_transformer_ef
    )
    print(f"ChromaDB is connect ({collection.count()} jeux indexés)")

@app.get("/")
def read_root():
    return {"status": "API ONLINE"}

@app.post("/api/search", response_model=SearchResult)
def search_games(request: SearchRequest):
    if collection is None:
        raise HTTPException(status_code=500, detail="Base de données non initialisée")
    
    results = gamepulse_search(
        user_query=request.query,
        collection=collection,
        mistral_api_key=MISTRAL_KEY,
        required_tags=request.required_tags,
        max_price=request.max_price,
        use_reranker=request.use_reranker,
        top_k=request.top_k
    )
    
    return SearchResult(results=[GameResponse(**r) for r in results])