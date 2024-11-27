from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from server.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User")
