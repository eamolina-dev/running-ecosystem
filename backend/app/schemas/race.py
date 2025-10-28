from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class RaceBase(BaseModel):
    name: Optional[str] = None
    distance_km: float
    elevation_gain: Optional[float] = None
    terrain_type: Optional[str] = None
    price: Optional[float] = None
    start_datetime: datetime
    max_participants: Optional[int] = None
    registration_open: Optional[bool] = True


class RaceCreate(RaceBase):
    event_id: int


class RaceUpdate(BaseModel):
    name: Optional[str] = None
    distance_km: Optional[float] = None
    elevation_gain: Optional[float] = None
    terrain_type: Optional[str] = None
    price: Optional[float] = None
    start_datetime: Optional[datetime] = None
    max_participants: Optional[int] = None
    registration_open: Optional[bool] = None


class RaceRead(RaceBase):
    id: int
    event_id: int

    class Config:
        orm_mode = True
