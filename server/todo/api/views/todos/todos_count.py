from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import select, func
from core.config import settings
from core.models import db_helper
from core.models.todo import Todo

router = APIRouter(
    prefix=settings.api_todos.todos,
    tags=settings.api_todos.tags,
)

@router.get("-count", response_model=int)
async def get_todos_count(session: AsyncSession = Depends(db_helper.session_getter)) -> int:
    result = await session.execute(select(func.count(Todo.id)))
    return result.scalar()
