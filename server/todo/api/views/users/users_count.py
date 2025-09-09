from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from api.dependencies.get_db import get_db_session
from core.config import settings
from core.models.user import User

router = APIRouter(
    prefix=settings.api_users.users,
    tags=["Users"],
)

@router.get("-count", response_model=int)
async def get_users_count(session: AsyncSession = Depends(get_db_session)) -> int:
    result = await session.execute(select(func.count(User.id)))
    return result.scalar()