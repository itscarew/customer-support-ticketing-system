import mongoose from "mongoose";

//This is the interface of the comment document
export interface IComment extends mongoose.Document {
  _id: number;
  content: string;
  ticketId: number;
  user: number;
}

//This is the Schema for a Comment, the sructure of how the comment document is going to be.
const CommentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  content: {
    type: String,
    trim: true,
    required: [true, "Comments can't be left blank!"],
  },
  ticketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ticket",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Comment = mongoose.model<IComment>("Comment", CommentSchema);
export default Comment;