from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from server.database import Base, engine
from server.routes import user, chat
from server.websocket import ConnectionManager

Base.metadata.create_all(bind=engine)

app = FastAPI()
manager = ConnectionManager()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)
app.include_router(chat.router)


@app.get("/")
def read_root():
    return {"message": "Welcome to the Chat App API!"}


@app.websocket("/ws/chat")
async def chat_websocket(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(data)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
