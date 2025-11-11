from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.registration import RegistrationCreate, RegistrationUpdate, RegistrationRead
from app.services import registration


router = APIRouter(prefix="/registrations", tags=["Registrations"])


@router.get("/", response_model=list[RegistrationRead])
def get_all_registrations(db: Session = Depends(get_db)):
    return registration.get_all(db)


@router.get("/{reg_id}", response_model=RegistrationRead)
def get_registration(reg_id: int, db: Session = Depends(get_db)):
    return registration.get_by_id(db, reg_id)


@router.post("/", response_model=RegistrationRead)
def create_registration(reg_in: RegistrationCreate, db: Session = Depends(get_db)):
    return registration.create(db, reg_in)


@router.put("/{reg_id}", response_model=RegistrationRead)
def update_registration(reg_id: int, reg_in: RegistrationUpdate, db: Session = Depends(get_db)):
    return registration.update(db, reg_id, reg_in)


@router.delete("/{reg_id}")
def delete_registration(reg_id: int, db: Session = Depends(get_db)):
    return registration.delete(db, reg_id)

#  cross endpoints
