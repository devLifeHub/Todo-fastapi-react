from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from typing import Callable
import logging

ALLOW_ORIGINS = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:5173",
]

def register_middlewares(app: FastAPI) -> None:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=ALLOW_ORIGINS,
        allow_methods=["*"],
        allow_headers=["*"],
        allow_credentials=True,
    )

    print("🔥 CORS Middleware загружена!")


logging.basicConfig(level=logging.INFO)


class LogRequestMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next: Callable):
        logging.info(f"Incoming request: {request.method} {request.url}")
        logging.info(f"Headers: {request.headers}")

        if request.method in ["POST", "PUT", "PATCH"]:
            body = await request.body()

            try:
                logging.info(f"Body: {body.decode('utf-8')}")
            except UnicodeDecodeError:
                logging.info(f"Received binary file ({len(body)} bytes), skipping text decoding.")

        response = await call_next(request)

        logging.info(f"Response status: {response.status_code}")

        return response

def data_middlewares(app: FastAPI) -> None:
    app.add_middleware(LogRequestMiddleware)
