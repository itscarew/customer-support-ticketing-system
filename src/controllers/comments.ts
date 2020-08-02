import Comment from "../models/comment";

import { Response } from "express";
import Ticket from "../models/tickets";

export const comments_get_all = (req: any, res: Response) => {
  Comment.find()
    .exec()
    .then((comment) => {
      res.status(200).json({ comments: comment });
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
      });
    });
};

export const comments_create_comment = (req: any, res: Response) => {
  const { ticketId } = req.params;
  const comment = new Comment({
    content: req.body.content,
    ticket: ticketId,
    user: req.user.userId,
  });

  Ticket.findById(ticketId)
    .exec()
    .then((ticket) => {
      if (!ticket) {
        res.status(404).json({
          message: "Article does not exists",
        });
      } else {
        comment
          .save()
          .then((comment) => {
            res.status(201).json({
              message: "Comment created successfully",
              comment,
            });
          })
          .catch((err) => {
            res.status(500).json({
              err: "Something went wrong, Comment not created",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
      });
    });
};

export const comments_get_comment = (req: any, res: Response) => {
  const { commentId } = req.params;

  Comment.findOne({ _id: commentId })
    .populate("user", "_id name email ")
    .populate("ticket", "_id description subject createdAt cloedAt status")
    .exec()
    .then((comment) => {
      if (!comment) {
        res.status(404).json({
          err: "Comment not found",
        });
      }
      res.status(200).json({
        message: "Comment found",
        comment,
      });
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
      });
    });
};

export const comments_for_a_ticket = (req: any, res: Response) => {
  const { ticketId } = req.params;

  Comment.find({ ticket: ticketId })
    .exec()
    .then((comment) => {
      res.status(200).json({
        message: `All comments for ${ticketId} ticket`,
        comments: comment,
      });
    })
    .catch((err) => {
      res.status(400).json({
        err: "Something went wrong",
      });
    });
};

export const comments_delete_comment = (req: any, res: Response) => {
  const { commentId } = req.params;

  Comment.deleteOne({ _id: commentId })
    .exec()
    .then((comment) => {
      res.status(200).json({
        message: "Comment removed successfully",
      });
    })
    .catch((err) => {
      res.status(400).json({
        err: "No comment found/Something went wrong",
      });
    });
};
