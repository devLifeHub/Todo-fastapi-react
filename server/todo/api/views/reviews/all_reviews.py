from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from core.config import settings
from core.schemas.review import ReviewRead
from core.crud.review import get_reviews
from api.dependencies.get_db import get_db_session

router = APIRouter(
    prefix=settings.api_reviews.reviews,
    tags=["Reviews"],
)

@router.get("/all", response_model=list[ReviewRead])
async def get_all_reviews_route(session: AsyncSession = Depends(get_db_session)):
    reviews = await get_reviews(session)
    if not reviews:
        raise HTTPException(status_code=404, detail="Отзывы отсутствуют")
    return reviews