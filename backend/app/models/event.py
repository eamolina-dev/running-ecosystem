from datetime import datetime
from sqlalchemy import (
    Column, Integer, String, Float, Date, DateTime,
    ForeignKey, Text
)
from sqlalchemy.orm import relationship
from app.db.base import Base 

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    location = Column(String, nullable=True)
    banner_url = Column(String, nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=True)
    year = Column(Integer, nullable=False)
    status = Column(String, default="upcoming")  # upcoming, ongoing, finished
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relaciones
    organization = relationship("Organization", back_populates="events")
    races = relationship("Race", back_populates="event")

    def __repr__(self):
        return f"<Event(id={self.id}, name='{self.name}')>"
