from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class ResultBase(BaseModel):
    finish_time: float  # segundos o minutos
    position_overall: Optional[int] = None
    position_gender: Optional[int] = None
    position_category: Optional[int] = None


class ResultCreate(ResultBase):
    runner_id: int
    race_id: int


class ResultUpdate(BaseModel):
    finish_time: Optional[float] = None
    position_overall: Optional[int] = None
    position_gender: Optional[int] = None
    position_category: Optional[int] = None


class ResultRead(ResultBase):
    id: int
    runner_id: int
    race_id: int
    created_at: datetime

    class Config:
        orm_mode = True
