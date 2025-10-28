from sqlalchemy import (
    Column, Integer, String, Float, Date,
    ForeignKey, Text
)
from sqlalchemy.orm import relationship
from app.db.base import Base 

class Runner(Base):
    __tablename__ = "runners"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    full_name = Column(String, nullable=False)
    birth_date = Column(Date, nullable=True)
    gender = Column(String, nullable=True)
    city = Column(String, nullable=True)
    country = Column(String, nullable=True)
    avatar_url = Column(String, nullable=True)
    bio = Column(Text, nullable=True)
    instagram = Column(String, nullable=True)
    team_name = Column(String, nullable=True)
    
    # Campos derivados / estadísticas (pueden calcularse en servicios)
    total_races = Column(Integer, default=0)
    podiums = Column(Integer, default=0)
    average_pace = Column(Float, nullable=True)

    # Relaciones
    user = relationship("User", back_populates="runner_profile")
    registrations = relationship("Registration", back_populates="runner")
    results = relationship("Result", back_populates="runner")

    def __repr__(self):
        return f"<Runner(id={self.id}, name='{self.full_name}')>"
