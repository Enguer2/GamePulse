from pydantic import BaseModel
from typing import List, Optional

class SearchRequest(BaseModel):
    query: str
    required_tags: Optional[List[str]] = None
    max_price: Optional[float] = None
    use_reranker: bool = True
    top_k: int = 5

class GameResponse(BaseModel):
    name: str
    price: str
    tags: str
    score: str
    description: str
    app_id: Optional[int] = None
    header_image: Optional[str] = None

class SearchResult(BaseModel):
    results: List[GameResponse]