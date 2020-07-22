const mongoose = require("mongoose");

//Status object
const status = {
  OPEN: "open",
  CLOSED: "closed",
};

//This is the Schema for a Ticket, the sructure of how the ticket document is going to be.
const TicketSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  description: {
    type: String,
    trim: true,
    required: [true, "Your Ticket description cannot be blank!"],
  },
  subject: { type: String, trim: true, required: true },
  createdAt: { type: Date, default: Date.now },
  closedAt: { type: Date, default: Date.now },
  status: {
    type: String,
    default: status.OPEN,
    enum: [status.OPEN, status.CLOSED],
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Ticket", TicketSchema);
