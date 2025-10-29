from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import (
    user, runner, organization,
    event, race, registration, result,
    auth
)
from app.db.base import Base
from app.db.session import engine

# Crear tablas
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Running Hub API", version="1.0")

origins = [
    "http://localhost:5173",  # dirección por defecto de Vite
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # permite POST, GET, OPTIONS, etc.
    allow_headers=["*"],
)

# Incluir routers
app.include_router(user.router)
app.include_router(runner.router)
app.include_router(organization.router)
app.include_router(event.router)
app.include_router(race.router)
app.include_router(registration.router)
app.include_router(result.router)

app.include_router(auth.router)
