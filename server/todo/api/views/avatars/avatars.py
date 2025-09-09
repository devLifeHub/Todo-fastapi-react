import io
import base64
import importlib

from fastapi import APIRouter, UploadFile, Depends, status, HTTPException
from fastapi.responses import StreamingResponse
from celery.result import AsyncResult
from sqlalchemy import select

from core.config import settings
from core.models import Avatar
from core.models.user import User
from core.celery_app import celery_app
from api.views.auth_users.fastapi_users import fastapi_users
from api.dependencies.get_db import db_helper

router = APIRouter(prefix=settings.api_avatars.avatars, tags=["Avatars"])
current_user = fastapi_users.current_user()


def get_upload_task():
    """
    Подтягиваем upload_file_task из core.celery_tasks
    """
    mod = importlib.import_module("core.celery_tasks")
    return mod.upload_file_task


def get_fetch_task():
    """
    Подтягиваем fetch_avatar_by_id_task из core.celery_tasks
    """
    mod = importlib.import_module("core.celery_tasks")
    return mod.fetch_avatar_by_id_task


@router.post("/upload/task", status_code=status.HTTP_202_ACCEPTED)
async def upload_avatar(
    file: UploadFile,
    user: User = Depends(current_user),
):
    """
    Читаем файл и ставим задачу на upload_file_task
    """
    data = await file.read()
    task = get_upload_task().apply_async(
        args=[user.id, data, file.filename, file.content_type]
    )
    return {"task_id": task.id}


@router.get("/upload/status/{task_id}")
def upload_status(task_id: str):
    res = AsyncResult(task_id, app=celery_app)

    response = {"task_id": task_id, "status": res.state}

    if res.state == "SUCCESS":
        response["avatarId"] = res.result

    return response


@router.get("/fetch/task/id/{avatar_id}", status_code=status.HTTP_202_ACCEPTED)
def fetch_avatar_task(avatar_id: str):
    """
    Ставим задачу на fetch_avatar_by_id_task
    """
    task = get_fetch_task().apply_async(args=[avatar_id])
    return {"task_id": task.id}


@router.get("/fetch/status/{task_id}")
def fetch_status(task_id: str):
    """
    Статус fetch_avatar_by_id_task
    """
    res = AsyncResult(task_id, app=celery_app)
    return {"task_id": task_id, "status": res.state}


@router.get("/fetch/result/{task_id}")
def fetch_result(task_id: str):
    """
    Когда задача fetch_avatar_by_id_task закончилась — отдаем картинку
    """
    res = AsyncResult(task_id, app=celery_app)
    if res.state != "SUCCESS":
        raise HTTPException(status_code=404, detail="Result not ready")

    payload = res.result or {}
    if "error" in payload:
        raise HTTPException(status_code=500, detail=payload["error"])

    b64 = payload.get("bytes_b64")
    ctype = payload.get("content_type", "application/octet-stream")
    data = base64.b64decode(b64)
    return StreamingResponse(io.BytesIO(data), media_type=ctype)


@router.get("/fetch/user/task", status_code=status.HTTP_202_ACCEPTED)
async def fetch_user_avatar(
    user: User = Depends(current_user),
    db = Depends(db_helper.session_getter),
):
    """
    Узнаем avatar_id из БД и ставим fetch-avatar задачу
    """
    row = await db.execute(select(Avatar).where(Avatar.user_id == user.id))
    avatar = row.scalar_one_or_none()
    if not avatar:
        return {"avatar_url": None}

    task = get_fetch_task().apply_async(args=[avatar.avatar])
    return {"avatar_id": avatar.avatar, "task_id": task.id}