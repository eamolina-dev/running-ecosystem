from fastapi import FastAPI
from app.routers import (
    user, runner, organization,
    event, race, registration, result
)
from app.db.base import Base
from app.db.session import engine

# Crear tablas
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Running Hub API", version="1.0")

# Incluir routers
app.include_router(user.router)
app.include_router(runner.router)
app.include_router(organization.router)
app.include_router(event.router)
app.include_router(race.router)
app.include_router(registration.router)
app.include_router(result.router)
