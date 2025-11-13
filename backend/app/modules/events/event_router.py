from http.client import HTTPException
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.modules.events.event_schema import EventCreate, EventRead, EventUpdate
from app.modules.organizations.organization_schema import OrganizationRead
from app.modules.races.race_schema import RaceRead
from app.modules.events import event_service
from app.modules.events.event_service import get_org_by_event, get_races_by_event
from app.modules.users.user_model import User

router = APIRouter(prefix="/events", tags=["Events"])


@router.get("/", response_model=list[EventRead])
def get_all_events(db: Session = Depends(get_db)):
    return event_service.get_all_events(db)


@router.get("/{event_id}", response_model=EventRead)
def get_event(event_id: int, db: Session = Depends(get_db)):
    return event_service.get_by_id(db, event_id)


@router.post("/", response_model=EventRead)
def create_event(event_in: EventCreate, db: Session = Depends(get_db)):
    return event_service.create(db, event_in)


@router.put("/{event_id}", response_model=EventRead)
def update_event(event_id: int, event_in: EventUpdate, db: Session = Depends(get_db)):
    return event_service.update(db, event_id, event_in)


@router.delete("/{event_id}")
def delete_event(event_id: int, db: Session = Depends(get_db)):
    return event_service.delete(db, event_id)

#  cross endpoints

@router.get("/{event_id}/organization", response_model=OrganizationRead)
def read_event_organization(event_id: int, db: Session = Depends(get_db)):
    return get_org_by_event(db, event_id)

@router.get("/{event_id}/races", response_model=list[RaceRead])
def read_races_by_event(event_id: int, db: Session = Depends(get_db)):
    return get_races_by_event(db, event_id)