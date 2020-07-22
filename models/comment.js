const mongoose = require("mongoose");

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
});

module.exports = mongoose.model("Comment", CommentSchema);
