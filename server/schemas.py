from pydantic import BaseModel
from datetime import datetime


class UserCreate(BaseModel):
    username: str
    password: str


class User(BaseModel):
    id: int
    username: str

    class Config:
        orm_mode = True


class MessageCreate(BaseModel):
    content: str
    user_id: int


class Message(BaseModel):
    id: int
    content: str
    timestamp: datetime
    user: User

    class Config:
        orm_mode = True
