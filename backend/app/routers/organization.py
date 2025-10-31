from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.organization import OrganizationBase, OrganizationCreate, OrganizationUpdate
from app.services import organization
# from app.services.organization import get_org_events

router = APIRouter(prefix="/organizations", tags=["Organizations"])


@router.get("/", response_model=list[OrganizationBase])
def get_all_orgs(db: Session = Depends(get_db)):
    return organization.get_all(db)


@router.get("/{org_id}", response_model=OrganizationBase)
def get_org(org_id: int, db: Session = Depends(get_db)):
    return organization.get_by_id(db, org_id)


@router.post("/", response_model=OrganizationBase)
def create_org(org_in: OrganizationCreate, db: Session = Depends(get_db)):
    return organization.create(db, org_in)


@router.put("/{org_id}", response_model=OrganizationBase)
def update_org(org_id: int, org_in: OrganizationUpdate, db: Session = Depends(get_db)):
    return organization.update(db, org_id, org_in)


@router.delete("/{org_id}")
def delete_org(org_id: int, db: Session = Depends(get_db)):
    return organization.delete(db, org_id)
