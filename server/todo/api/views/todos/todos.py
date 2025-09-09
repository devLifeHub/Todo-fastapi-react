from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from core.config import settings
from core.models import db_helper
from core.schemas.todo import TodoCreate, TodoUpdate, TodoResponse
from core.crud.todo import (
    create_todo,
    get_todos,
    get_todo,
    update_todo,
    delete_todo,
)
from core.models.user import User
from api.views.auth_users.fastapi_users import fastapi_users


router = APIRouter(
    prefix=settings.api_todos.todos,
    tags=["Todos"],
)

current_user = fastapi_users.current_user()

@router.post("/", response_model=TodoResponse, status_code=status.HTTP_201_CREATED)
async def create_todo_route(
    todo_data: TodoCreate,
    session: AsyncSession = Depends(db_helper.session_getter),
    user: User = Depends(current_user),
):
    todo = await create_todo(session, user.id, todo_data)
    return todo


@router.get("/", response_model=list[TodoResponse])
async def list_todos_route(
    session: AsyncSession = Depends(db_helper.session_getter),
    user: User = Depends(current_user),
):
    todos = await get_todos(session, user.id)
    return todos


@router.get("/{todo_id}", response_model=TodoResponse)
async def get_todo_route(
    todo_id: int,
    session: AsyncSession = Depends(db_helper.session_getter),
    user: User = Depends(current_user),
):
    todo = await get_todo(session, user.id, todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="Задача не найдена")
    return todo

@router.api_route(
    "/{todo_id}",
    methods=["PUT", "PATCH"],
    response_model=TodoResponse
)
async def update_or_patch_todo(
    todo_id: int,
    todo_data: TodoUpdate,
    session: AsyncSession = Depends(db_helper.session_getter),
    user: User = Depends(current_user),
):
    todo = await update_todo(session, user.id, todo_id, todo_data)
    if not todo:
        raise HTTPException(status_code=404, detail="Задача не найдена")
    return todo


@router.delete("/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_todo_route(
    todo_id: int,
    session: AsyncSession = Depends(db_helper.session_getter),
    user: User = Depends(current_user),
):
    success = await delete_todo(session, user.id, todo_id)
    if not success:
        raise HTTPException(status_code=404, detail="Задача не найдена")
    return
