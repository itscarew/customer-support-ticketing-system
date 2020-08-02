import mongoose from "mongoose";

import {role} from "../auth/role";

//This is the interface of the user document
export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  joined: Date;
  role: string;
}

//This is the Schema for a User, the sructure of how the user document is going to be.
const UserSchema = new mongoose.Schema({
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

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
