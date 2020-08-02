import mongoose from "mongoose";

import Ticket from "../models/tickets";

import { Response } from "express";

export const tickets_get_all = (req: any, res: Response) => {
  Ticket.find()
    .exec()
    .then((ticket) => {
      res.status(200).json({ tickets: ticket });
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
      });
    });
};

export const tickets_create_ticket = (req: any, res: Response) => {
  const ticket = new Ticket({
    description: req.body.description,
    subject: req.body.subject,
    user: req.user.userId,
  });

  return ticket
    .save()
    .then((ticket) => {
      res.status(201).json({
        message: "Ticket created successfully",
        ticket: ticket,
      });
    })
    .catch((err) => {
      res.status(500).json({
        err: "Something went wrong, Ticket not created",
      });
    });
};

export const tickets_get_ticket = (req: any, res: Response) => {
  const { ticketId } = req.params;

  Ticket.findOne({ _id: ticketId })
    .populate("user", "_id name email")
    .exec()
    .then((ticket) => {
      if (!ticket) {
        res.status(404).json({
          err: "Ticket does not exists",
        });
      } else {
        res.status(200).json({
          message: "Ticket found",
          ticket: ticket,
        });
      }
    })
    .catch((err) => {
      res.status(404).json({
        err: "No ticket found",
      });
    });
};

export const tickets_for_a_user = (req: any, res: Response) => {
  const { userId } = req.params;

  Ticket.find({ user: userId })
    .select("_id description subject createdAt closedAt status")
    .exec()
    .then((ticket) => {
      res.status(200).json({
        message: `All Tickets for ${userId} user`,
        tickets: ticket,
      });
    })
    .catch((err) => {
      res.status(400).json({
        err: "No ticket found",
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
      res.status(404).json({
        err: "No ticket found",
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
        err: "Something went wrong, ticket status not updated",
      });
    });
};
