const WebSocket = require("ws");

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
const PORT = process.env.PORT || 8080;
    server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    });
