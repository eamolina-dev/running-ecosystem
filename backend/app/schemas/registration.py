from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class RegistrationBase(BaseModel):
    payment_status: Optional[str] = "pending"
    payment_method: Optional[str] = None
    bib_number: Optional[int] = None
    notes: Optional[str] = None


class RegistrationCreate(RegistrationBase):
    runner_id: int
    race_id: int


class RegistrationUpdate(BaseModel):
    payment_status: Optional[str] = None
    payment_method: Optional[str] = None
    bib_number: Optional[int] = None
    notes: Optional[str] = None


class RegistrationRead(RegistrationBase):
    id: int
    runner_id: int
    race_id: int
    registered_at: datetime

    class Config:
        orm_mode = True
