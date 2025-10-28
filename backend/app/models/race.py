from sqlalchemy import (
    Column, Integer, String, Float, Boolean, DateTime,
    ForeignKey
)
from sqlalchemy.orm import relationship
from app.db.base import Base 

class Race(Base):
    __tablename__ = "races"

    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey("events.id"), nullable=False)
    name = Column(String, nullable=True)  # opcional (por ejemplo "Trail corto")
    distance_km = Column(Float, nullable=False)
    elevation_gain = Column(Float, nullable=True)
    terrain_type = Column(String, nullable=True)  # trail, street, mixto, etc
    price = Column(Float, nullable=True)
    start_datetime = Column(DateTime, nullable=False)
    max_participants = Column(Integer, nullable=True)
    registration_open = Column(Boolean, default=True)

    # Relaciones
    event = relationship("Event", back_populates="races")
    registrations = relationship("Registration", back_populates="race")
    results = relationship("Result", back_populates="race")

    def __repr__(self):
        return f"<Race(id={self.id}, distance={self.distance_km}km)>"
