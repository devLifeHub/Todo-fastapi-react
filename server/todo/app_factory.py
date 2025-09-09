import logging
from core.config import settings
from create_fastapi_app import create_app
from api import router

# Настройка логирования
logging.basicConfig(
    level=settings.logging.log_level_value,
    format=settings.logging.log_format,
)

# Создаём FastAPI-приложение
app = create_app(create_custom_static_urls=True)

# Подключаем роутеры
app.include_router(router)
