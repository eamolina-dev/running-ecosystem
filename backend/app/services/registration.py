from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.registration import Registration
from app.schemas.registration import RegistrationCreate, RegistrationUpdate

def get_all(db: Session):
    return db.query(Registration).all()


def get_by_id(db: Session, reg_id: int):
    reg = db.query(Registration).filter(Registration.id == reg_id).first()
    if not reg:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Registration not found")
    return reg


def create(db: Session, reg_in: RegistrationCreate):
    reg = Registration(**reg_in.dict())
    db.add(reg)
    db.commit()
    db.refresh(reg)
    return reg


def update(db: Session, reg_id: int, reg_in: RegistrationUpdate):
    reg = get_by_id(db, reg_id)
    for field, value in reg_in.dict(exclude_unset=True).items():
        setattr(reg, field, value)
    db.commit()
    db.refresh(reg)
    return reg


def delete(db: Session, reg_id: int):
    reg = get_by_id(db, reg_id)
    db.delete(reg)
    db.commit()
    return {"message": "Registration deleted successfully"}
