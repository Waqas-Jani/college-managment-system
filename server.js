require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const socketIo = require("socket.io");
var path = require("path");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const errorHandler = require("./middleware/errorHandler");

// All Routes
const adminRoutes = require("./routes/v1/admin");
const depRoutes = require("./routes/v1/department");
const courseRoutes = require("./routes/v1/course");
const facultyRoutes = require("./routes/v1/faculty");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Cors middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Body parser
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

//cookies parser
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

// Routes

app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/department", depRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/faculty", facultyRoutes);

// Error handler

app.use(errorHandler);

// For production
if (process.env.NODE_ENV === "production") {
  app.use(compression());
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// Socket.IO Real-Time Notifications
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  //   socket.on("joinRoom", (room) => {
  //     socket.join(room);
  //     console.log(`User joined room: ${room}`);
  //   });

  //   socket.on("sendNotification", (data) => {
  //     io.to(data.room).emit("receiveNotification", data);
  //   });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start Server
const PORT = process.env.PORT || 5050;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// close db connection when server stop
process.on("SIGINT", async () => {
  await mongoose.disconnect();
  console.log("MongoDB disconnected due to app termination");
  process.exit(0);
});
