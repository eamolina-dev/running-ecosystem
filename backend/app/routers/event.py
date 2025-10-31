from http.client import HTTPException
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.event import EventBase, EventCreate, EventUpdate
from app.services import event
from app.services.event import (
    get_events_by_org
)
from app.core.deps import get_current_user
from app.models.user import User

router = APIRouter(prefix="/events", tags=["Events"])


@router.get("/", response_model=list[EventBase])
def get_all_events(db: Session = Depends(get_db)):
    return event.get_all_events(db)


@router.get("/{event_id}", response_model=EventBase)
def get_event(event_id: int, db: Session = Depends(get_db)):
    return event.get_by_id(db, event_id)


@router.post("/", response_model=EventBase)
def create_event(event_in: EventCreate, db: Session = Depends(get_db)):
    return event.create(db, event_in)


@router.put("/{event_id}", response_model=EventBase)
def update_event(event_id: int, event_in: EventUpdate, db: Session = Depends(get_db)):
    return event.update(db, event_id, event_in)


@router.delete("/{event_id}")
def delete_event(event_id: int, db: Session = Depends(get_db)):
    return event.delete(db, event_id)

#  cross endpoints

@router.get("/org/{org_id}/events", response_model=list[EventBase])
def read_events_by_org(org_id: int, db: Session = Depends(get_db)):
    return get_events_by_org(db, org_id)
