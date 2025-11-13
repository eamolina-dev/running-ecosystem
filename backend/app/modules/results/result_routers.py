from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.modules.results.result_schema import ResultCreate, ResultUpdate, ResultRead
from app.modules.results import result_service

router = APIRouter(prefix="/results", tags=["Results"])


@router.get("/", response_model=list[ResultRead])
def get_all_results(db: Session = Depends(get_db)):
    return result_service.get_all(db)


@router.get("/{result_id}", response_model=ResultRead)
def get_result(result_id: int, db: Session = Depends(get_db)):
    return result_service.get_by_id(db, result_id)


@router.post("/", response_model=ResultRead)
def create_result(result_in: ResultCreate, db: Session = Depends(get_db)):
    return result_service.create(db, result_in)


@router.put("/{result_id}", response_model=ResultRead)
def update_result(result_id: int, result_in: ResultUpdate, db: Session = Depends(get_db)):
    return result_service.update(db, result_id, result_in)


@router.delete("/{result_id}")
def delete_result(result_id: int, db: Session = Depends(get_db)):
    return result_service.delete(db, result_id)

#  cross endpoints
