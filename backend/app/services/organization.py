from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.organization import Organization
from app.schemas.organization import OrganizationCreate, OrganizationUpdate
from app.models.event import Event

def get_all(db: Session):
    return db.query(Organization).all()


def get_by_id(db: Session, org_id: int):
    org = db.query(Organization).filter(Organization.id == org_id).first()
    if not org:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Organization not found")
    return org


def create(db: Session, org_in: OrganizationCreate):
    org = Organization(**org_in.dict())
    db.add(org)
    db.commit()
    db.refresh(org)
    return org


def update(db: Session, org_id: int, org_in: OrganizationUpdate):
    org = get_by_id(db, org_id)
    for field, value in org_in.dict(exclude_unset=True).items():
        setattr(org, field, value)
    db.commit()
    db.refresh(org)
    return org


def delete(db: Session, org_id: int):
    org = get_by_id(db, org_id)
    db.delete(org)
    db.commit()
    return {"message": "Organization deleted successfully"}
