const mongoose = require("mongoose");

const Ticket = require("../models/tickets");

exports.tickets_get_all = (req, res) => {
  Ticket.find()
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
  const ticket = new Ticket({
    _id: mongoose.Types.ObjectId(),
    description: req.body.description,
    subject: req.body.subject,
    userId: req.body.userId,
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

  Ticket.find({ _id: ticketId })
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

  Ticket.find({ userId: userId })
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

  Ticket.deleteOne({ _id: ticketId })
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
  Ticket.updateOne(
    { _id: ticketId },
    { $set: { status: req.body.status, closedAt: new Date() } }
  )
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
