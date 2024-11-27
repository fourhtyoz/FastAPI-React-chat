import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { messageStore } from "../stores/messageStore";
import { authStore } from "../stores/authStore";
import { connectWebSocket, sendWebSocketMessage } from "../websocket";

const Chat = observer(() => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    messageStore.loadMessages();
    connectWebSocket(setMessages);
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    sendWebSocketMessage({'content': newMessage, 'user': authStore.user.id})
    await messageStore.addMessage(newMessage, authStore.user.id);
    setNewMessage("");
  };

  return (
    <div>
      <h1>Chat App</h1>
      <div style={{ border: "1px solid #ccc", padding: "10px", height: "300px", overflowY: "scroll" }}>
        {messageStore.messages.map((msg) => (
          <div key={msg.id}>
            <strong>User {msg.user.id}:</strong> {msg.content} <small>({new Date(msg.timestamp).toLocaleTimeString()})</small>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message"
          style={{ width: "80%" }}
        />
        <button type="submit" style={{ width: "20%" }}>
          Send
        </button>
      </form>
    </div>
  );
});

export default Chat;
