# 📝 TodoList

Полноценное веб‑приложение для управления задачами с backend на **FastAPI** и frontend на **React (Vite)**.  
В проекте используется **PostgreSQL** для хранения данных, **Redis** для фоновых задач через **Celery**, а также **Alembic** для миграций базы.

---

## 📦 Стек технологий

### Backend
- Python 3.13
- FastAPI
- Poetry
- Alembic (миграции)
- Celery + Redis (фоновые задачи)
- PostgreSQL

### Frontend
- React + Vite
- SCSS

### Инфраструктура
- Docker + Docker Compose
- Gunicorn + UvicornWorker

##  ℹ️ Примечание:
> Файл `.env`, находящийся в проекте, несёт **исключительно презентационный смысл**.  
> Он предназначен для демонстрации структуры переменных окружения и не содержит реальных секретных данных. 

---

## 🚀 Запуск проекта

### 1. Клонирование репозитория и переход в директорию проекта
```bash
git clone https://github.com/devLifeHub/Todo-fastapi-react.git
```

### 2. Переход в директорию проекта
```bash
cd Todo-fastapi-react
```

### 3. Сборка и запуск контейнеров
```bash
docker compose up --build --no-cache
```

## ✅ После запуска:
- Backend: http://localhost:8000
- Swagger UI: http://localhost:8000/docs
- Frontend: http://localhost:5173