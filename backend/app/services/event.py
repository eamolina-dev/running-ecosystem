from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.event import Event
from app.schemas.event import EventCreate, EventUpdate

def get_all(db: Session):
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
