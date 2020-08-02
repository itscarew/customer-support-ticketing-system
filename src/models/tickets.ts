import mongoose from "mongoose"

//the status of the tickets(default will be open)
const status = {
  OPEN: "open",
  CLOSED: "closed",
};

//This is the interface of the Ticket document
export interface ITicket extends mongoose.Document {
  description: string; 
  subject: string,
  createdAt: Date,
  closedAt:Date,
  status : string,
  user : number
};


//This is the Schema for a Ticket, the sructure of how the ticket document is going to be.
const TicketSchema = new mongoose.Schema({
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
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Ticket = mongoose.model<ITicket>("Ticket", TicketSchema);
export default Ticket;