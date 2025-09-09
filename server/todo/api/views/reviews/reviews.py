from fastapi import APIRouter, Depends
from core.config import settings
from core.schemas.review import ReviewCreate
from core.models.user import User
from api.views.auth_users.fastapi_users import fastapi_users
from core.celery_tasks import create_review_task, delete_all_reviews_task, upload_file_task

from celery.result import AsyncResult
from core.celery_app import celery_app

router = APIRouter(
    prefix=settings.api_reviews.reviews,
    tags=["Reviews"],
)

current_user = fastapi_users.current_user()

@router.post("/", response_model=dict)
async def create_review_route(
    review_data: ReviewCreate,
    current_user: User = Depends(current_user),
):
    """
    Запускает в фоне создание нового отзыва через Celery.
    Возвращает task_id для отслеживания статуса задачи.
    """
    task = create_review_task.delay(current_user.id, review_data.dict())
    return {"task_id": task.id, "detail": "Запрос на создание отзыва принят"}

@router.delete("/")
async def delete_all_reviews_route(
    current_user: User = Depends(current_user),
):
    """
    Запускает задачу удаления всех отзывов текущего пользователя через Celery.
    Возвращает task_id для отслеживания выполнения.
    """
    task = delete_all_reviews_task.delay(current_user.id)
    return {"task_id": task.id, "detail": "Запрос на удаление отзывов принят"}

@router.get("/status/{task_id}", response_model=dict)
async def get_task_status(task_id: str):
    """
    Эндпоинт для проверки статуса celery-задачи.
    Если задача завершилась с ошибкой, результат исключения преобразуется в строку.
    """
    task_result = AsyncResult(task_id, app=celery_app)
    result = task_result.result
    if isinstance(result, Exception):
        result = str(result)
    return {
        "task_id": task_id,
        "status": task_result.status,
        "result": result
    }