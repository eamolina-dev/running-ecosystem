from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.modules.races.race_schema import RaceCreate, RaceUpdate, RaceRead
from app.modules.results.result_schema import ResultRead
from app.modules.races import race_service
from app.modules.races.race_service import (
    get_results_by_race
)

router = APIRouter(prefix="/races", tags=["Races"])


@router.get("/", response_model=list[RaceRead])
def get_all_races(db: Session = Depends(get_db)):
    return race_service.get_all(db)


@router.get("/{race_id}", response_model=RaceRead)
def get_race(race_id: int, db: Session = Depends(get_db)):
    return race_service.get_by_id(db, race_id)


@router.post("/", response_model=RaceRead)
def create_race(race_in: RaceCreate, db: Session = Depends(get_db)):
    return race_service.create(db, race_in)


@router.put("/{race_id}", response_model=RaceRead)
def update_race(race_id: int, race_in: RaceUpdate, db: Session = Depends(get_db)):
    return race_service.update(db, race_id, race_in)


@router.delete("/{race_id}")
def delete_race(race_id: int, db: Session = Depends(get_db)):
    return race_service.delete(db, race_id)

#  cross endpoints


@router.get("/{race_id}/results", response_model=list[ResultRead])
def read_results_by_race(race_id: int, db: Session = Depends(get_db)):
    return get_results_by_race(db, race_id)
