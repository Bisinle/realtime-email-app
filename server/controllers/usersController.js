const User = require("../models/userModel");





//^get all users Route------------------------------------------------->
const fetchUsers = async (req, res) => {
  const users = await User.find();
  res.json({ users: users });
};

//^ find user byId Route------------------------------------------------>
const fetchUserById = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId)
    .populate("sentEmails")
    .populate("receivedEmails");

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json({ user: user });
};

//^ post to users Route------------------------------------------------>
const createUser = async (req, res) => {
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
};

//^update emails Route------------------------------------------------->
const updateUser = async (req, res) => {
  try {
    const updatUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatUser) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json({ user: updatUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  fetchUsers: fetchUsers,
  fetchUserById: fetchUserById,
  createUser: createUser,
  updateUser: updateUser,
};
