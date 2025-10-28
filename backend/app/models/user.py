from datetime import datetime
from sqlalchemy import (
    Column, Integer, String, Boolean, DateTime
)
from sqlalchemy.orm import relationship
from app.db.base import Base 

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="runner")  # runner, org_admin, superadmin
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_login = Column(DateTime, nullable=True)

    # Relaciones
    runner_profile = relationship("Runner", back_populates="user", uselist=False)
    organization_admin = relationship("Organization", back_populates="admin", uselist=False)

    def __repr__(self):
        return f"<User(id={self.id}, email='{self.email}', role='{self.role}')>"
