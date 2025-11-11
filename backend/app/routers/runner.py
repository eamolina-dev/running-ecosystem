from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.runner import RunnerCreate, RunnerUpdate, RunnerRead
from app.schemas.registration import RegistrationRead 
from app.services import runner

router = APIRouter(prefix="/runners", tags=["Runners"])


@router.get("/", response_model=list[RunnerRead])
def get_all_runners(db: Session = Depends(get_db)):
    return runner.get_all(db)


@router.get("/{runner_id}", response_model=RunnerRead)
def get_runner(runner_id: int, db: Session = Depends(get_db)):
    return runner.get_by_id(db, runner_id)


@router.post("/", response_model=RunnerRead)
def create_runner(runner_in: RunnerCreate, db: Session = Depends(get_db)):
    return runner.create(db, runner_in)


@router.put("/{runner_id}", response_model=RunnerRead)
def update_runner(runner_id: int, runner_in: RunnerUpdate, db: Session = Depends(get_db)):
    return runner.update(db, runner_id, runner_in)


@router.delete("/{runner_id}")
def delete_runner(runner_id: int, db: Session = Depends(get_db)):
    return runner.delete(db, runner_id)

#  cross endpoints

@router.get("/{runner_id}/registrations", response_model=list[RegistrationRead])
def read_registrations_by_runner(runner_id: int, db: Session = Depends(get_db)):
    return runner.get_registrations_by_runner(db, runner_id)
