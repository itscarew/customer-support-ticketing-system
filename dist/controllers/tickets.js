"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tickets_update_ticket_status = exports.tickets_delete_ticket = exports.tickets_for_a_user = exports.tickets_get_ticket = exports.tickets_create_ticket = exports.tickets_get_all = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const tickets_1 = __importDefault(require("../models/tickets"));
exports.tickets_get_all = (req, res) => {
    tickets_1.default.find()
        .exec()
        .then((ticket) => {
        res.status(200).json({ data: ticket });
    })
        .catch((err) => {
        res.status(500).json({
            message: err,
        });
    });
};
exports.tickets_create_ticket = (req, res) => {
    const ticket = new tickets_1.default({
        _id: mongoose_1.default.Types.ObjectId(),
        description: req.body.description,
        subject: req.body.subject,
        user: req.body.user,
    });
    return ticket
        .save()
        .then((ticket) => {
        res.status(201).json({
            message: "Ticket created successfully",
            data: ticket,
        });
    })
        .catch((err) => {
        res.status(500).json({
            message: "Something went wrong, Ticket not created",
        });
    });
};
exports.tickets_get_ticket = (req, res) => {
    const { ticketId } = req.params;
    tickets_1.default.find({ _id: ticketId })
        .populate("user", "_id name email")
        .exec()
        .then((ticket) => {
        res.status(200).json({
            message: "Ticket found",
            data: ticket[0],
        });
    })
        .catch((err) => {
        res.status(400).json({
            message: "No ticket found",
        });
    });
};
exports.tickets_for_a_user = (req, res) => {
    const { userId } = req.params;
    tickets_1.default.find({ user: userId })
        .exec()
        .then((ticket) => {
        res.status(200).json({
            message: `All Tickets for ${userId} user`,
            data: ticket,
        });
    })
        .catch((err) => {
        res.status(400).json({
            message: "No ticket found",
        });
    });
};
exports.tickets_delete_ticket = (req, res) => {
    const { ticketId } = req.params;
    tickets_1.default.deleteOne({ _id: ticketId })
        .exec()
        .then((ticket) => {
        res.status(200).json({
            message: "Ticket removed Successfully",
        });
    })
        .catch((err) => {
        res.status(400).json({
            message: "No ticket found",
        });
    });
};
exports.tickets_update_ticket_status = (req, res) => {
    const { ticketId } = req.params;
    tickets_1.default.updateOne({ _id: ticketId }, { $set: { status: req.body.status, closedAt: new Date() } })
        .exec()
        .then(() => {
        res.status(200).json({
            message: "Ticket status Updated",
        });
    })
        .catch((err) => {
        res.status(500).json({
            message: "Something went wrong, ticket status not updated",
        });
    });
};
//# sourceMappingURL=tickets.js.map