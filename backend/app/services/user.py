from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate
from app.core.security import get_password_hash

def get_all(db: Session):
    return db.query(User).all()


def get_by_id(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user


def get_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def create(db: Session, user_in: UserCreate):
    existing_user = get_by_email(db, user_in.email)
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    hashed_password = get_password_hash(user_in.password)
    user = User(
        email=user_in.email,
        username=user_in.username,
        password_hash=hashed_password,
        role=user_in.role,
        is_active=user_in.is_active,
        is_verified=user_in.is_verified
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def update(db: Session, user_id: int, user_in: UserUpdate):
    user = get_by_id(db, user_id)

    if user_in.password:
        user.password_hash = get_password_hash(user_in.password)
    if user_in.username is not None:
        user.username = user_in.username
    if user_in.email is not None:
        user.email = user_in.email
    if user_in.is_active is not None:
        user.is_active = user_in.is_active
    if user_in.is_verified is not None:
        user.is_verified = user_in.is_verified

    db.commit()
    db.refresh(user)
    return user


def delete(db: Session, user_id: int):
    user = get_by_id(db, user_id)
    db.delete(user)
    db.commit()
    return {"message": "User deleted successfully"}
