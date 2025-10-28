from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.runner import RunnerBase, RunnerCreate, RunnerUpdate
from app.services import runner

router = APIRouter(prefix="/runners", tags=["Runners"])


@router.get("/", response_model=list[RunnerBase])
def get_all_runners(db: Session = Depends(get_db)):
    return runner.get_all(db)


@router.get("/{runner_id}", response_model=RunnerBase)
def get_runner(runner_id: int, db: Session = Depends(get_db)):
    return runner.get_by_id(db, runner_id)


@router.post("/", response_model=RunnerBase)
def create_runner(runner_in: RunnerCreate, db: Session = Depends(get_db)):
    return runner.create(db, runner_in)


@router.put("/{runner_id}", response_model=RunnerBase)
def update_runner(runner_id: int, runner_in: RunnerUpdate, db: Session = Depends(get_db)):
    return runner.update(db, runner_id, runner_in)


@router.delete("/{runner_id}")
def delete_runner(runner_id: int, db: Session = Depends(get_db)):
    return runner.delete(db, runner_id)
