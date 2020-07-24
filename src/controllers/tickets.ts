import mongoose from "mongoose";

import Ticket from "../models/tickets";

import {  Response } from "express";

export const tickets_get_all = (req: any, res: Response) => {
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

export const tickets_create_ticket = (req: any, res: Response) => {
  const ticket = new Ticket({
    _id: mongoose.Types.ObjectId(),
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

export const tickets_get_ticket = (req: any, res: Response) => {
  const { ticketId } = req.params;

  Ticket.find({ _id: ticketId })
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

export const tickets_for_a_user = (req: any, res: Response) => {
  const { userId } = req.params;

  Ticket.find({ user: userId })
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

export const tickets_delete_ticket = (req: any, res: Response) => {
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

export const tickets_update_ticket_status = (req: any, res: Response) => {
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
