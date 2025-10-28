from datetime import date
from typing import Optional
from pydantic import BaseModel

class RunnerBase(BaseModel):
    full_name: str
    birth_date: Optional[date] = None
    gender: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    instagram: Optional[str] = None
    team_name: Optional[str] = None


class RunnerCreate(RunnerBase):
    user_id: int


class RunnerUpdate(BaseModel):
    full_name: Optional[str] = None
    birth_date: Optional[date] = None
    gender: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    instagram: Optional[str] = None
    team_name: Optional[str] = None


class RunnerRead(RunnerBase):
    id: int
    user_id: int
    total_races: Optional[int] = 0
    podiums: Optional[int] = 0
    average_pace: Optional[float] = None

    class Config:
        orm_mode = True
