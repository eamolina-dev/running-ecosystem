from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.user import UserCreate, UserUpdate, UserRead
from app.services import user
from app.core.deps import get_current_user
from app.models.user import User
from app.models.runner import Runner
from app.models.organization import Organization
from app.services.user import format_user_with_profile

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/me")
def get_me(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return format_user_with_profile(db, current_user)

@router.get("/", response_model=list[UserRead])
def get_all_users(db: Session = Depends(get_db)):
    return user.get_all(db)

@router.get("/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return format_user_with_profile(db, user)

@router.post("/", response_model=UserRead)
def create_user(user_in: UserCreate, db: Session = Depends(get_db)):
    return user.create(db, user_in)


@router.put("/{user_id}", response_model=UserRead)
def update_user(user_id: int, user_in: UserUpdate, db: Session = Depends(get_db)):
    return user.update(db, user_id, user_in)


@router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    return user.delete(db, user_id)
