const mongoose = require("mongoose");

const role = require("../auth/role");

//This is the Schema for a User, the sructure of how the user document is going to be.
const UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    minlength: [6, "Name is too short!"],
    required: [true, "Your name cannot be blank!"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Your email cannot be blank!"],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Your password cannot be blank!"],
  },
  joined: { type: Date, default: Date.now },
  role: {
    type: String,
    default: role.BASIC,
    enum: [role.BASIC, role.AGENT, role.ADMIN],
  },
});

module.exports = mongoose.model("User", UserSchema);
