const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("success:----------->connected to db");
  } catch (error) {
    console.error(`Error---------------->: ${error.message}`);
  }
};
module.exports = connectDB;
