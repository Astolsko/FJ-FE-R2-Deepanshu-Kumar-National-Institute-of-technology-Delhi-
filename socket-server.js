const { Server } = require("socket.io");

const io = new Server(3001, {
  cors: { origin: "*" },
});

console.log("🚀 Socket.IO server running on port 3001");

io.on("connection", (socket) => {
  socket.on("join-room", (roomId) => {
    socket.join(roomId);

    // Driver joins automatically
    setTimeout(() => {
      io.to(roomId).emit("receive-message", {
        sender: "Driver",
        message: "Hi! I’m your driver 🚕 Where exactly should I pick you up?",
        time: new Date().toLocaleTimeString(),
      });
    }, 1000);
  });

  socket.on("send-message", ({ roomId, message, sender }) => {
    io.to(roomId).emit("receive-message", {
      sender,
      message,
      time: new Date().toLocaleTimeString(),
    });

    // Auto driver reply
    if (sender === "User") {
      socket.to(roomId).emit("typing");

      setTimeout(() => {
        io.to(roomId).emit("receive-message", {
          sender: "Driver",
          message: getDriverReply(message),
          time: new Date().toLocaleTimeString(),
        });
      }, 2000);
    }
  });

  socket.on("typing", (roomId) => {
    socket.to(roomId).emit("typing");
  });
});

function getDriverReply(userMsg) {
  const replies = [
    "Got it 👍 I’m on my way.",
    "Okay, I see the location.",
    "I’ll reach in about 5 minutes.",
    "Please wait near the main gate.",
    "I’m almost there 🚗",
  ];
  return replies[Math.floor(Math.random() * replies.length)];
}

