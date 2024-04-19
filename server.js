const WebSocket = require("ws");

const PORT = process.env.PORT || 8080;
const server = new WebSocket.Server({ port: PORT });

server.on("connection", (socket) => {
  console.log("A new client connected");

  socket.on("message", (message) => {
    console.log("Received:", message.toString());

    // Xử lý dữ liệu nhận được từ client ở đây

    // Gửi phản hồi cho client
    if (message == "on") {
      socket.send(`Turn on the light`);
    } else {
      socket.send(`Server received: Else`);
    }
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });

  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});

console.log(`Server is running on port ${PORT}`);
