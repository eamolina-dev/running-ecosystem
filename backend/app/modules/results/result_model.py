from datetime import datetime
from sqlalchemy import (
    Column, Integer, Float, DateTime,
    ForeignKey
)
from sqlalchemy.orm import relationship
from app.db.base import Base 

class Result(Base):
    __tablename__ = "results"

    id = Column(Integer, primary_key=True, index=True)
    runner_id = Column(Integer, ForeignKey("runners.id"), nullable=False)
    race_id = Column(Integer, ForeignKey("races.id"), nullable=False)
    finish_time = Column(Float, nullable=False)  # en minutos o segundos
    position_overall = Column(Integer, nullable=True)
    position_gender = Column(Integer, nullable=True)
    position_category = Column(Integer, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    runner = relationship("Runner", back_populates="results")
    race = relationship("Race", back_populates="results")

    def __repr__(self):
        return f"<Result(runner_id={self.runner_id}, race_id={self.race_id})>"
