from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.user import UserBase, UserCreate, UserUpdate
from app.services import user
from app.core.deps import get_current_user
from app.models.user import User
from app.models.runner import Runner
from app.models.organization import Organization

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/me")
def get_me(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role == "runner":
        runner = db.query(Runner).filter(Runner.user_id == current_user.id).first()
        return {
            "id": current_user.id,
            "email": current_user.email,
            "role": current_user.role,
            "runner_id": runner.id if runner else None
        }

    if current_user.role == "organization":
        org = db.query(Organization).filter(Organization.user_id == current_user.id).first()
        return {
            "id": current_user.id,
            "email": current_user.email,
            "role": current_user.role,
            "organization_id": org.id if org else None
        }

    return current_user


# @router.get("/me", response_model=UserBase)
# def read_users_me(current_user: User = Depends(get_current_user)):
#     return current_user

@router.get("/", response_model=list[UserBase])
def get_all_users(db: Session = Depends(get_db)):
    return user.get_all(db)


@router.get("/{user_id}", response_model=UserBase)
def get_user(user_id: int, db: Session = Depends(get_db)):
    return user.get_by_id(db, user_id)


@router.post("/", response_model=UserBase)
def create_user(user_in: UserCreate, db: Session = Depends(get_db)):
    return user.create(db, user_in)


@router.put("/{user_id}", response_model=UserBase)
def update_user(user_id: int, user_in: UserUpdate, db: Session = Depends(get_db)):
    return user.update(db, user_id, user_in)


@router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    return user.delete(db, user_id)
