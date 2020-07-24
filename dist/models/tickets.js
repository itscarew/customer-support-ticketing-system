"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
//the status of the tickets(default will be open)
const status = {
    OPEN: "open",
    CLOSED: "closed",
};
;
//This is the Schema for a Ticket, the sructure of how the ticket document is going to be.
const TicketSchema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
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
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
});
const Ticket = mongoose_1.default.model("Ticket", TicketSchema);
exports.default = Ticket;
//# sourceMappingURL=tickets.js.map