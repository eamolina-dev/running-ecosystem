from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.user import UserBase, UserCreate, UserUpdate
from app.services import user

router = APIRouter(prefix="/users", tags=["Users"])


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
