from sqlalchemy import (
    Column, Integer, String,
    ForeignKey, Text
)
from sqlalchemy.orm import relationship
from app.db.base import Base 

class Organization(Base):
    __tablename__ = "organizations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    name = Column(String, unique=True, nullable=False)
    description = Column(Text, nullable=True)
    website = Column(String, nullable=True)
    logo_url = Column(String, nullable=True)
    location = Column(String, nullable=True)
    founded_year = Column(Integer, nullable=True)
    social_links = Column(Text, nullable=True)  # JSON string o texto con URLs

    # admin_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    # Relaciones
    admin = relationship("User", back_populates="organization_admin")
    events = relationship("Event", back_populates="organization")

    def __repr__(self):
        return f"<Organization(id={self.id}, name='{self.name}')>"
