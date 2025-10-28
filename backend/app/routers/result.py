from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.result import ResultBase, ResultCreate, ResultUpdate
from app.services import result

router = APIRouter(prefix="/results", tags=["Results"])


@router.get("/", response_model=list[ResultBase])
def get_all_results(db: Session = Depends(get_db)):
    return result.get_all(db)


@router.get("/{result_id}", response_model=ResultBase)
def get_result(result_id: int, db: Session = Depends(get_db)):
    return result.get_by_id(db, result_id)


@router.post("/", response_model=ResultBase)
def create_result(result_in: ResultCreate, db: Session = Depends(get_db)):
    return result.create(db, result_in)


@router.put("/{result_id}", response_model=ResultBase)
def update_result(result_id: int, result_in: ResultUpdate, db: Session = Depends(get_db)):
    return result.update(db, result_id, result_in)


@router.delete("/{result_id}")
def delete_result(result_id: int, db: Session = Depends(get_db)):
    return result.delete(db, result_id)
