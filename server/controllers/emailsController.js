const Email = require("../models/emailModel");

//^get all users Route------------------------------------------------->
const fetchAllemails = async (req, res) => {
  const page = req.query.page || 0;
  const itemsPerPage = 7;

  const totalPages = await Email.countDocuments();
  const emails = await Email.find()
    .skip(page * itemsPerPage)
    .limit(itemsPerPage);

  res.json({
    emails: emails,
    itemsPerPage: itemsPerPage,
    totalPages: totalPages,
  });
};

const createEmail = async (req, res) => {
  try {
    const io = req.app.get("socketio");

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
    //^ --------------------------------------------------------------------
    if (io) {
      console.log("Attempting to notify recipients:", recipients);

      // Notify each recipient
      recipients.forEach((recipientId) => {
        const room = `user_${recipientId}`;
        console.log("Emitting newEmail to room:", room);
        io.to(room).emit("send", {
          id: email._id,
          subject: email.subject,
          sender: req.body.sender,
          body: req.body.body,
        });
        // broadcast(room, {
        //   id: email._id,
        //   subject: email.subject,
        //   sender: req.body.sender,
        //   body: req.body.body,
        // })
      });

      console.log("Email created and notifications sent");
    }
    res.status(201).json({ email: email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//^update emails Route------------------------------------------------->
// const updateEmail = async (req, res) => {

//   try {
//     const upadateEmail = await Email.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {
//         new: true,
//       }
//     );
//     if (!upadateEmail) {
//       return res.status(404).json({ message: "email not found" });
//     }
//     // Notify each recipient
//     const room = `user_${upadateEmail.recipients.id}`;
//     console.log("Emitting newEmail to room:", room);
//     io.to(room).emit("send", {
//       upadateEmail,
//     });

//     res.json({ upadateEmail });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
const updateEmail = async (req, res) => {
  try {
    const updatedEmail = await Email.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedEmail) {
      return res.status(404).json({ message: "email not found" });
    }

    // If this is a read status update, no need to emit to recipient
    // The change stream will handle notifying the sender

    res.json({ email: updatedEmail });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//^ get email byID route------------------------------------------------->
const fetchEmailById = async (req, res) => {
  try {
    let email = await Email.findById(req.params.id).sort({ createdAt: -1 });
    if (!email) {
      return res.status(404).json({ message: "email not found" });
    }
    //^a bit hectic but gets the job done
    email =
      email.sender.toString() === req.params.id.toString()
        ? await email.populate("recipients", "firstName lastName email")
        : await email.populate("sender", "firstName lastName email");
    const is_receiver =
      email.recipients.toString() === req.params.id.toString();
    res.json({ email: email });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//^Delete emails Route------------------------------------------------->
const deleteEmail = async (req, res) => {
  try {
    const deletedEmail = await Email.findByIdAndDelete(req.params.id);
    if (!deletedEmail) {
      return res.status(404).json({ message: "email not found" });
    }
    res.json({ message: "email deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  fetchAllemails,
  createEmail,
  updateEmail,
  fetchEmailById,
  deleteEmail,
};
