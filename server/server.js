// when deploying on heroku they will have their way of loading env variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//^ importing dependencies------------------------------------------------->
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const connectToDb = require("./config/connectToDb");
const authRoutes = require("./auth/authRoutes");

//^initialize an express app------------------------------------------------->
const app = express();

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", process.env.FRONTEND_URL],
    methods: ["GET", "POST"],
  },
});
app.set("socketio", io);

//^configure express app ------------------------------------------------->
app.use(express.json());
app.use(cors());
const usersController = require("./controllers/usersController");
const emailsController = require("./controllers/emailsController");
const emailModel = require("./models/emailModel");

//^ connect to db ------------------------------------------------->
connectToDb();

app.get("/", (req, res) => {
  res.json("Hello from the server");
});
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

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join", (userId) => {
    console.log(`User ${userId} joining their room`);
    socket.join(`user_${userId}`);
    // client.set(userId, socket.id);
    // Send test notification
    socket.emit("connected", { message: "You are connected!" });
  });
  socket.on("send", async (data) => {
    socket.emit("EMAIL_DATA", {
      data: data,
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${process.env.APP_PORT}`);
});

const changeStream = emailModel.watch();

changeStream.on("change", (change) => {
  if (change.operationType === "insert") {
    const email = change.fullDocument;
    //* console.log(email, "new console log");
    io.to(`user_${email.recipient}`).emit("send", email);
  } else if (change.operationType === "update") {
    // Check if the isRead field was modified
    if (change.updateDescription.updatedFields?.isRead === true) {
      const emailId = change.documentKey._id;

      // Fetch the complete email document to get sender information
      emailModel
        .findById(emailId)
        .then((email) => {
          if (email && email.sender) {
            // Emit to sender's room that their email was read
            io.to(`user_${email.sender}`).emit("email_read", {
              emailId: emailId,
              readAt: new Date(),
              subject: email.subject,
            });
          }
        })
        .catch((err) => console.error("Error fetching email details:", err));
    }
  }
});

app.set("io", io);
