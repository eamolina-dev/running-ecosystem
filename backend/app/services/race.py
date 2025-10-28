from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.race import Race
from app.schemas.race import RaceCreate, RaceUpdate

def get_all(db: Session):
    return db.query(Race).all()


def get_by_id(db: Session, race_id: int):
    race = db.query(Race).filter(Race.id == race_id).first()
    if not race:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Race not found")
    return race


def create(db: Session, race_in: RaceCreate):
    race = Race(**race_in.dict())
    db.add(race)
    db.commit()
    db.refresh(race)
    return race


def update(db: Session, race_id: int, race_in: RaceUpdate):
    race = get_by_id(db, race_id)
    for field, value in race_in.dict(exclude_unset=True).items():
        setattr(race, field, value)
    db.commit()
    db.refresh(race)
    return race


def delete(db: Session, race_id: int):
    race = get_by_id(db, race_id)
    db.delete(race)
    db.commit()
    return {"message": "Race deleted successfully"}
