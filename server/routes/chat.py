from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from server import models, schemas, database

router = APIRouter(prefix="/messages", tags=["Messages"])


@router.get("/", response_model=list[schemas.Message])
def get_messages(db: Session = Depends(database.get_db)):
    messages = db.query(models.Message).order_by(models.Message.timestamp).all()
    return messages


@router.post("/", response_model=schemas.Message)
def create_message(message: schemas.MessageCreate, db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.id == message.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    new_message = models.Message(content=message.content, user_id=message.user_id)
    db.add(new_message)
    db.commit()
    db.refresh(new_message)
    return new_message

