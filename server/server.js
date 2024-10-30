// when deploying on heroku they will have their way of loading env variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//^ importing dependencies------------------------------------------------->
const express = require("express");
const connectToDb = require("./config/connectToDb");

//^initialize the app------------------------------------------------->
const app = express();
app.use(express.json());
const Email = require("./models/emailModel");
const usersController = require("./controllers/usersController");
const emailsController = require("./controllers/emailsController");

//^ connect to db ------------------------------------------------->
connectToDb();

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
app.listen(process.env.APP_PORT, () => {
  console.log("server started");
});
