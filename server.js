const WebSocket = require("ws");

const PORT = process.env.PORT || 8080;
const server = new WebSocket.Server({ port: PORT });

server.on("connection", (socket) => {
  console.log("A new client connected");

  // Inside the 'socket.on("message")' event handler
socket.on("message", (message) => {
  console.log("Received:", message.toString());
  let sensorData = message.toString().split(" ");
  const temperature = sensorData[0];
  const humidity = sensorData[1];
  const dataToSend = { temperature, humidity };
  socket.send(JSON.stringify(dataToSend));
  console.log(`Temperature: ${temperature} - Humidity: ${humidity}`);
  server.clients.forEach((client) => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(dataToSend));
      }
    });
});

    
    
    

    // Kiểm tra và xử lý dữ liệu nhận được từ client
  //   if (message.toString() === "on") {
  //     // Gửi tin nhắn "on" cho client
  //     socket.send("on");
  //   } else if (message.toString() === "off") {
  //     // Gửi tin nhắn "off" cho client
  //     socket.send("off");
  //   } else {
  //     // Gửi tin nhắn phản hồi nếu lệnh không hợp lệ
  //     socket.send("Invalid command");
  //   }
  // });

  socket.on("close", () => {
    console.log("Client disconnected");
  });

  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});

console.log(`Server is running on port ${PORT}`);
