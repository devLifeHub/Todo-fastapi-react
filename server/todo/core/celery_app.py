# todo/core/celery.py
import os
from celery import Celery
from core.config import settings

# Приоритет: REDIS_URL из окружения → settings.celery.broker_url
broker_url = os.getenv("REDIS_URL", settings.celery.broker_url)
backend_url = os.getenv("REDIS_URL", settings.celery.backend_url)

celery_app = Celery(
    "todo_tasks",
    broker=broker_url,
    backend=backend_url,
)

celery_app.conf.update(
    task_serializer="json",
    result_serializer="json",
    accept_content=["json"],
)

if os.getenv("DEBUG_CELERY"):
    print(f"[Celery] broker={broker_url}, backend={backend_url}")

import core.celery_tasks
