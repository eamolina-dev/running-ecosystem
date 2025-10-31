from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.registration import RegistrationBase, RegistrationCreate, RegistrationUpdate
from app.services import registration
from app.services.registration import (
    get_registrations_by_runner
)

router = APIRouter(prefix="/registrations", tags=["Registrations"])


@router.get("/", response_model=list[RegistrationBase])
def get_all_registrations(db: Session = Depends(get_db)):
    return registration.get_all(db)


@router.get("/{reg_id}", response_model=RegistrationBase)
def get_registration(reg_id: int, db: Session = Depends(get_db)):
    return registration.get_by_id(db, reg_id)


@router.post("/", response_model=RegistrationBase)
def create_registration(reg_in: RegistrationCreate, db: Session = Depends(get_db)):
    return registration.create(db, reg_in)


@router.put("/{reg_id}", response_model=RegistrationBase)
def update_registration(reg_id: int, reg_in: RegistrationUpdate, db: Session = Depends(get_db)):
    return registration.update(db, reg_id, reg_in)


@router.delete("/{reg_id}")
def delete_registration(reg_id: int, db: Session = Depends(get_db)):
    return registration.delete(db, reg_id)

#  cross endpoints

@router.get("/runner/{runner_id}/registrations", response_model=list[RegistrationBase])
def read_registrations_by_runner(runner_id: int, db: Session = Depends(get_db)):
    return get_registrations_by_runner(db, runner_id)
