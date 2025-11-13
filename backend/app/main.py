from app.modules.auth import auth_router
from app.modules.events import event_router
from app.modules.organizations import organization_router
from app.modules.payments import payments_router
from app.modules.races import race_router
from app.modules.registrations import registration_router
from app.modules.results import result_routers
from app.modules.runners import runner_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.modules.users import (
    user_router
)
from app.db.base import Base
from app.db.session import engine

# Crear tablas
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Running Hub API", version="1.0")

origins = [
    "http://localhost:5173",  # dirección por defecto de Vite
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # permite POST, GET, OPTIONS, etc.
    allow_headers=["*"],
)

# Incluir routers
app.include_router(user_router.router)
app.include_router(runner_router.router)
app.include_router(organization_router.router)
app.include_router(event_router.router)
app.include_router(race_router.router)
app.include_router(registration_router.router)
app.include_router(result_routers.router)

app.include_router(auth_router.router)
app.include_router(payments_router.router)
