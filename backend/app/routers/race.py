from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.race import RaceBase, RaceCreate, RaceUpdate
from app.schemas.result import ResultBase
from app.services import race
from app.services.race import (
    get_results_by_race
)

router = APIRouter(prefix="/races", tags=["Races"])


@router.get("/", response_model=list[RaceBase])
def get_all_races(db: Session = Depends(get_db)):
    return race.get_all(db)


@router.get("/{race_id}", response_model=RaceBase)
def get_race(race_id: int, db: Session = Depends(get_db)):
    return race.get_by_id(db, race_id)


@router.post("/", response_model=RaceBase)
def create_race(race_in: RaceCreate, db: Session = Depends(get_db)):
    return race.create(db, race_in)


@router.put("/{race_id}", response_model=RaceBase)
def update_race(race_id: int, race_in: RaceUpdate, db: Session = Depends(get_db)):
    return race.update(db, race_id, race_in)


@router.delete("/{race_id}")
def delete_race(race_id: int, db: Session = Depends(get_db)):
    return race.delete(db, race_id)

#  cross endpoints


@router.get("/{race_id}/results", response_model=list[ResultBase])
def read_results_by_race(race_id: int, db: Session = Depends(get_db)):
    return get_results_by_race(db, race_id)
