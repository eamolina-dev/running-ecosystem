from typing import Optional
from pydantic import BaseModel

class OrganizationBase(BaseModel):
    name: str
    description: Optional[str] = None
    website: Optional[str] = None
    logo_url: Optional[str] = None
    location: Optional[str] = None
    founded_year: Optional[int] = None
    social_links: Optional[str] = None


class OrganizationCreate(OrganizationBase):
    user_id: int


class OrganizationUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    website: Optional[str] = None
    logo_url: Optional[str] = None
    location: Optional[str] = None
    founded_year: Optional[int] = None
    social_links: Optional[str] = None


class OrganizationRead(OrganizationBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True
