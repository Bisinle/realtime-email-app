const Email = require("../models/emailModel");

//^get all users Route------------------------------------------------->
const fetchAllemails = async (req, res) => {
  const emails = await Email.find();
  res.json({ emails: emails });
};

const createEmail = async (req, res) => {
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

    const io = req.app.get("io");
    //^ neotify qofkasta
    recipients.forEach((recipientId) => {
      io.to(`user_${recipientId}`).emit("newEmail", {
        id: email._id,
        subject: email.subject,
        sender: req.body.sender,
      });
    });

    res.status(201).json({ email: email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//^update emails Route------------------------------------------------->
const updateEmail = async (req, res) => {
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
};

//^ get email byID route------------------------------------------------->
const fetchEmailById = async (req, res) => {
  try {
    let email = await Email.findById(req.params.id);
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
