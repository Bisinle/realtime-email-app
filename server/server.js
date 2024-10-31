// when deploying on heroku they will have their way of loading env variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//^ importing dependencies------------------------------------------------->
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const connectToDb = require("./config/connectToDb");
const authRoutes = require("./auth/authRoutes");

//^initialize an express app------------------------------------------------->
const app = express();

//^ Use the cors middleware
app.use(cors());

//^ socket server ----------------------------------->
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

//^ Socket.IO connection handling ------------------------------------>
io.on("connection", (socket) => {
  console.log("Client connected");

  //^ Handle joining user-specific room, i will definitely enjoy implemening this
  // socket.on("join", (userId) => {
  //   socket.join(`user_${userId}`);
  //   console.log(`User ${userId} joined their room`);
  // });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
//^configure express app ------------------------------------------------->
app.use(express.json());
app.use(cors());
const usersController = require("./controllers/usersController");
const emailsController = require("./controllers/emailsController");

//^ connect to db ------------------------------------------------->
connectToDb();

//^ Use the authentication routes
app.use("/auth", authRoutes);

//^ user routes ----------------------------------->
app.get("/users", usersController.fetchUsers);
app.get("/users/:id", usersController.fetchUserById);
app.put("/users/:id", usersController.updateUser);
app.post("/users", usersController.createUser);

//^ emails routes ----------------------------------->
app.get("/emails", emailsController.fetchAllemails);
app.get("/emails/:id", emailsController.fetchEmailById);
app.post("/emails", emailsController.createEmail);
app.put("/emails/:id", emailsController.updateEmail);
app.delete("/emails/:id", emailsController.deleteEmail);

//^ listening the port ------------------------------------------------->
// app.listen(process.env.APP_PORT, () => {
//   console.log("server started");
// });
server.listen(process.env.APP_PORT, () => {
  console.log(`Server started on port ${process.env.APP_PORT}`);
});

app.set("io", io);
