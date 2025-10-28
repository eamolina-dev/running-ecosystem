from datetime import date
from typing import Optional
from pydantic import BaseModel

class EventBase(BaseModel):
    name: str
    description: Optional[str] = None
    location: Optional[str] = None
    banner_url: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    start_date: date
    end_date: Optional[date] = None
    year: int
    status: Optional[str] = "upcoming"


class EventCreate(EventBase):
    organization_id: int


class EventUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    banner_url: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    year: Optional[int] = None
    status: Optional[str] = None


class EventRead(EventBase):
    id: int
    organization_id: int

    class Config:
        orm_mode = True
