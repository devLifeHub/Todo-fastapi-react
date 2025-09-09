import logging
import multiprocessing
import subprocess
from core.config import settings
from core.gunicorn import Application, get_app_options
from app_factory import app

logging.basicConfig(
    level=settings.logging.log_level_value,
    format=settings.logging.log_format,
)

def start_redis_server():
    logging.info("🚀 Запуск Redis...")
    subprocess.run(["redis-server"])

def start_celery_worker():
    logging.info("🚀 Запуск Celery worker...")
    subprocess.run(["celery", "-A", "core.celery_app", "worker", "--loglevel=info"])

def main():
    redis_process = multiprocessing.Process(target=start_redis_server)
    redis_process.start()

    celery_process = multiprocessing.Process(target=start_celery_worker)
    celery_process.start()

    Application(
        application=app,
        options=get_app_options(
            host=settings.gunicorn.host,
            port=settings.gunicorn.port,
            timeout=settings.gunicorn.timeout,
            workers=settings.gunicorn.workers,
            log_level=settings.logging.log_level,
        ),
    ).run()

    celery_process.join()

if __name__ == "__main__":
    main()
