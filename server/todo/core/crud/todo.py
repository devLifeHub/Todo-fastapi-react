from typing import List, Optional

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from core.models.todo import Todo as TodoModel
from core.schemas.todo import TodoCreate, TodoUpdate


async def create_todo(
    session: AsyncSession, user_id: int, todo_data: TodoCreate
) -> TodoModel:
    todo = TodoModel(**todo_data.dict(), user_id=user_id)
    session.add(todo)
    await session.commit()
    await session.refresh(todo)
    return todo


async def get_todos(
    session: AsyncSession, user_id: int
) -> List[TodoModel]:
    result = await session.execute(
        select(TodoModel).where(TodoModel.user_id == user_id)
    )
    return result.scalars().all()


async def get_todo(
    session: AsyncSession, user_id: int, todo_id: int
) -> Optional[TodoModel]:
    result = await session.execute(
        select(TodoModel)
        .where(TodoModel.user_id == user_id, TodoModel.id == todo_id)
    )
    return result.scalar_one_or_none()


async def update_todo(
    session: AsyncSession,
    user_id: int,
    todo_id: int,
    todo_data: TodoUpdate
) -> Optional[TodoModel]:
    todo = await get_todo(session, user_id, todo_id)
    if not todo:
        return None

    update_fields = todo_data.dict(exclude_unset=True)
    for field, value in update_fields.items():
        setattr(todo, field, value)

    await session.commit()
    await session.refresh(todo)
    return todo


async def delete_todo(
    session: AsyncSession, user_id: int, todo_id: int
) -> bool:
    """
    Удаляет задачу. Возвращает True, если было удаление, иначе False.
    """
    todo = await get_todo(session, user_id, todo_id)
    if not todo:
        return False

    await session.delete(todo)
    await session.commit()
    return True
