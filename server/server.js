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
const User = require("./models/userModel");
const Email = require("./models/emailModel");

//^ connect to db ------------------------------------------------->
connectToDb();

//^ home Route------------------------------------------------->
app.get("/", (req, res) => {
  res.json("server started");
});

//^ post to users Route------------------------------------------------>
app.get("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId)
    .populate("sentEmails")
    .populate("receivedEmails");

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json({ user: user });
});

//^ post to users Route------------------------------------------------>
app.post("/users", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  const user = await User.create({
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
  });
  res.json({ user: user });
});

//^ post to emails Route------------------------------------------------->
// app.post("/emails", async (req, res) => {
//   const sender = req.body.sender;
//   const recipients = [req.body.recipients];
//   const subject = req.body.subject;
//   const body = req.body.body;
//   const isRead = req.body.isRead;

//     const email =({
//       sender: sender,
//       recipients: recipients,
//       subject: subject,
//       body: body,
//       isRead: isRead,
//     });

//   res.json({ email: email });
// });
app.post("/emails", async (req, res) => {
  try {
    const recipients = Array.isArray(req.body.recipients)
      ? req.body.recipients
      : [req.body.recipients];

    const email = await Email.create({
      sender: req.body.sender,
      recipients: recipients,
      subject: req.body.subject,
      body: req.body.body,
      isRead: req.body.isRead,
    });

    // Populate the sender and recipients details
    // const populatedEmail = await Email.findById(email._id)
    //   .populate("sender", "firstName lastName email")
    //   .populate("recipients", "firstName lastName email");

    res.status(201).json({ email: email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
//^update emails Route------------------------------------------------->
app.put("/emails/:id", async (req, res) => {
  try {
    const updatEmail = await Email.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatEmail) {
      return res.status(404).json({ message: "email not found" });
    }
    res.json({ email: updatEmail });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//^ listening the port ------------------------------------------------->
app.listen(process.env.APP_PORT, () => {
  console.log("server started");
});
