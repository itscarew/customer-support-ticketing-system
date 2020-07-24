import Comment from "../models/comment"
import mongoose from "mongoose"

import {Response} from "express"

export const comments_get_all = (req:any, res:Response) => {
  Comment.find()
    .exec()
    .then((comment) => {
      res.status(200).json({ data: comment });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

export const comments_create_comment = (req:any, res:Response) => {
  const comment = new Comment({
    _id: mongoose.Types.ObjectId(),
    content: req.body.content,
    ticketId: req.body.ticketId,
    user : req.body.user
  });

  comment
    .save()
    .then((comment) => {
      res.status(201).json({
        message: "Comment created successfully",
        data: comment,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong, Comment not created",
      });
    });
};

export const comments_get_comment = (req:any, res:Response) => {
  const { commentId } = req.params;

  Comment.find({ _id: commentId }).populate("user", "_id name email ")
    .exec()
    .then((comment) => {
      res.status(200).json({
        message: "Comment found",
        data: comment[0],
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "No Comment found",
      });
    });
};

export const comments_for_a_ticket = (req:any, res:Response) => {
  const { ticketId } = req.params;

  Comment.find({ ticketId: ticketId })
    .exec()
    .then((comment) => {
      res.status(200).json({
        message: `All comments for ${ticketId} ticket`,
        data: comment,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Something went wrong",
      });
    });
};

export const comments_delete_comment = (req:any, res:Response) => {
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
        message: "No comment found/Something went wrong",
      });
    });
};
