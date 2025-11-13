from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.modules.events.event_model import Event
from app.modules.organizations.organization_model import Organization
from app.modules.races.race_model import Race
from app.modules.events.event_schema import EventCreate, EventUpdate

def get_all_events(db: Session):
    return db.query(Event).all()


def get_by_id(db: Session, event_id: int):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")
    return event


def create(db: Session, event_in: EventCreate):
    event = Event(**event_in.dict())
    db.add(event)
    db.commit()
    db.refresh(event)
    return event


def update(db: Session, event_id: int, event_in: EventUpdate):
    event = get_by_id(db, event_id)
    for field, value in event_in.dict(exclude_unset=True).items():
        setattr(event, field, value)
    db.commit()
    db.refresh(event)
    return event


def delete(db: Session, event_id: int):
    event = get_by_id(db, event_id)
    db.delete(event)
    db.commit()
    return {"message": "Event deleted successfully"}

# cross functions

def get_org_by_event(db: Session, event_id: int):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    org = db.query(Organization).filter(Organization.id == event.organization_id).first()
    if not org:
        raise HTTPException(status_code=404, detail="Organization not found for this event")
    
    # print(org)

    return org


def get_races_by_event(db: Session, event_id: int):
    return db.query(Race).filter(Race.event_id == event_id).all()
