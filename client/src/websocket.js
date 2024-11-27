let socket;

export function connectWebSocket(setMessages) {
  socket = new WebSocket("ws://127.0.0.1:8000/ws/chat");

  socket.onopen = () => {
    console.log("WebSocket connected");
  };

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  socket.onclose = () => {
    console.log("WebSocket disconnected");
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };
}

export function sendWebSocketMessage(message) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  }
}
