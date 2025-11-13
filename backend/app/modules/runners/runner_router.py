from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.modules.runners.runner_schema import RunnerCreate, RunnerUpdate, RunnerRead
from app.modules.registrations.registration_schema import RegistrationRead 
from app.modules.runners import runner_service

router = APIRouter(prefix="/runners", tags=["Runners"])


@router.get("/", response_model=list[RunnerRead])
def get_all_runners(db: Session = Depends(get_db)):
    return runner_service.get_all(db)


@router.get("/{runner_id}", response_model=RunnerRead)
def get_runner(runner_id: int, db: Session = Depends(get_db)):
    return runner_service.get_by_id(db, runner_id)


@router.post("/", response_model=RunnerRead)
def create_runner(runner_in: RunnerCreate, db: Session = Depends(get_db)):
    return runner_service.create(db, runner_in)


@router.put("/{runner_id}", response_model=RunnerRead)
def update_runner(runner_id: int, runner_in: RunnerUpdate, db: Session = Depends(get_db)):
    return runner_service.update(db, runner_id, runner_in)


@router.delete("/{runner_id}")
def delete_runner(runner_id: int, db: Session = Depends(get_db)):
    return runner_service.delete(db, runner_id)

#  cross endpoints

@router.get("/{runner_id}/registrations", response_model=list[RegistrationRead])
def read_registrations_by_runner(runner_id: int, db: Session = Depends(get_db)):
    return runner_service.get_registrations_by_runner(db, runner_id)
