const Comment = require("../models/comment");

const mongoose = require("mongoose");

exports.comments_get_all = (req, res) => {
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

exports.comments_create_comment = (req, res) => {
  const comment = new Comment({
    _id: mongoose.Types.ObjectId(),
    content: req.body.content,
    ticketId: req.body.ticketId,
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

exports.comments_get_comment = (req, res) => {
  const { commentId } = req.params;

  Comment.find({ _id: commentId })
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

exports.comments_for_a_ticket = (req, res) => {
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

exports.comments_delete_comment = (req, res) => {
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
