from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.result import Result
from app.schemas.result import ResultCreate, ResultUpdate

def get_all(db: Session):
    return db.query(Result).all()


def get_by_id(db: Session, result_id: int):
    result = db.query(Result).filter(Result.id == result_id).first()
    if not result:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Result not found")
    return result


def create(db: Session, result_in: ResultCreate):
    result = Result(**result_in.dict())
    db.add(result)
    db.commit()
    db.refresh(result)
    return result


def update(db: Session, result_id: int, result_in: ResultUpdate):
    result = get_by_id(db, result_id)
    for field, value in result_in.dict(exclude_unset=True).items():
        setattr(result, field, value)
    db.commit()
    db.refresh(result)
    return result


def delete(db: Session, result_id: int):
    result = get_by_id(db, result_id)
    db.delete(result)
    db.commit()
    return {"message": "Result deleted successfully"}
