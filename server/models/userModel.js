const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    // Virtual populate for sent and received emails
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual fields for sent and received emails
userSchema.virtual("sentEmails", {
  ref: "Email",
  localField: "_id",
  foreignField: "sender",
});

userSchema.virtual("receivedEmails", {
  ref: "Email",
  localField: "_id",
  foreignField: "recipients",
});

const User = mongoose.model("User", userSchema);
module.exports = User;
