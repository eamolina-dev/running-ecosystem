from http.client import HTTPException
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.event import EventCreate, EventRead, EventUpdate
from app.schemas.organization import OrganizationRead
from app.schemas.race import RaceRead
from app.services import event
from app.services.event import get_org_by_event, get_races_by_event
from app.models.user import User

router = APIRouter(prefix="/events", tags=["Events"])


@router.get("/", response_model=list[EventRead])
def get_all_events(db: Session = Depends(get_db)):
    return event.get_all_events(db)


@router.get("/{event_id}", response_model=EventRead)
def get_event(event_id: int, db: Session = Depends(get_db)):
    return event.get_by_id(db, event_id)


@router.post("/", response_model=EventRead)
def create_event(event_in: EventCreate, db: Session = Depends(get_db)):
    return event.create(db, event_in)


@router.put("/{event_id}", response_model=EventRead)
def update_event(event_id: int, event_in: EventUpdate, db: Session = Depends(get_db)):
    return event.update(db, event_id, event_in)


@router.delete("/{event_id}")
def delete_event(event_id: int, db: Session = Depends(get_db)):
    return event.delete(db, event_id)

#  cross endpoints

@router.get("/{event_id}/organization", response_model=OrganizationRead)
def read_event_organization(event_id: int, db: Session = Depends(get_db)):
    return get_org_by_event(db, event_id)

@router.get("/{event_id}/races", response_model=list[RaceRead])
def read_races_by_event(event_id: int, db: Session = Depends(get_db)):
    return get_races_by_event(db, event_id)