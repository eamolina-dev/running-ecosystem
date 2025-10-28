from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.runner import Runner
from app.schemas.runner import RunnerCreate, RunnerUpdate

def get_all(db: Session):
    return db.query(Runner).all()


def get_by_id(db: Session, runner_id: int):
    runner = db.query(Runner).filter(Runner.id == runner_id).first()
    if not runner:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Runner not found")
    return runner


def create(db: Session, runner_in: RunnerCreate):
    runner = Runner(**runner_in.dict())
    db.add(runner)
    db.commit()
    db.refresh(runner)
    return runner


def update(db: Session, runner_id: int, runner_in: RunnerUpdate):
    runner = get_by_id(db, runner_id)
    for field, value in runner_in.dict(exclude_unset=True).items():
        setattr(runner, field, value)
    db.commit()
    db.refresh(runner)
    return runner


def delete(db: Session, runner_id: int):
    runner = get_by_id(db, runner_id)
    db.delete(runner)
    db.commit()
    return {"message": "Runner deleted successfully"}
