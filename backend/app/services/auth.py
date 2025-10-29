# app/services/auth_service.py
from sqlalchemy.orm import Session
from app.models.user import User
from app.core.security import get_password_hash, verify_password, create_access_token
from app.schemas.auth import UserRegister, UserLogin
from datetime import timedelta
from fastapi import HTTPException, status

def register_user(db: Session, user_data: UserRegister):
    existing = db.query(User).filter(User.email == user_data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pwd = get_password_hash(user_data.password)
    user = User(
        email=user_data.email,
        username=user_data.username,
        hashed_password=hashed_pwd,
        role=user_data.role,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def login_user(db: Session, credentials: UserLogin):
    user = db.query(User).filter(User.email == credentials.email).first()
    if not user or not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    access_token = create_access_token({"sub": str(user.id)}, expires_delta=timedelta(hours=12))
    return {"access_token": access_token, "token_type": "bearer"}
