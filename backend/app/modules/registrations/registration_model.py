from datetime import datetime
from sqlalchemy import (
    Column, Integer, String, DateTime,
    ForeignKey, Text
)
from sqlalchemy.orm import relationship
from app.db.base import Base 

class Registration(Base):
    __tablename__ = "registrations"

    id = Column(Integer, primary_key=True, index=True)
    runner_id = Column(Integer, ForeignKey("runners.id"), nullable=False)
    race_id = Column(Integer, ForeignKey("races.id"), nullable=False)
    registered_at = Column(DateTime, default=datetime.utcnow)
    payment_status = Column(String, default="pending")  # pending, paid, failed
    payment_method = Column(String, nullable=True)
    bib_number = Column(Integer, nullable=True)
    notes = Column(Text, nullable=True)

    runner = relationship("Runner", back_populates="registrations")
    race = relationship("Race", back_populates="registrations")

    def __repr__(self):
        return f"<Registration(runner_id={self.runner_id}, race_id={self.race_id})>"
