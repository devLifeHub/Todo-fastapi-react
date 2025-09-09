FROM python:3.13-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential libffi-dev libpq-dev python3-dev cargo \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir poetry

ENV PATH="/root/.local/bin:$PATH" \
    POETRY_REQUESTS_TIMEOUT=300 \
    PIP_DEFAULT_TIMEOUT=300 \
    POETRY_VIRTUALENVS_CREATE=false \
    POETRY_NO_INTERACTION=1 \
    PYTHONPATH=/app:/app/todo


WORKDIR /app

COPY pyproject.toml poetry.lock ./

RUN poetry install --no-ansi --no-root

COPY README.md .
COPY middlewares.py .
COPY todo/ ./todo/


CMD ["gunicorn", "todo.main:app", "-w", "1", "-k", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8000"]