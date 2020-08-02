"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comments_delete_comment = exports.comments_for_a_ticket = exports.comments_get_comment = exports.comments_create_comment = exports.comments_get_all = void 0;
const comment_1 = __importDefault(require("../models/comment"));
const tickets_1 = __importDefault(require("../models/tickets"));
exports.comments_get_all = (req, res) => {
    comment_1.default.find()
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
exports.comments_create_comment = (req, res) => {
    const { ticketId } = req.params;
    const comment = new comment_1.default({
        content: req.body.content,
        ticket: ticketId,
        user: req.user.userId,
    });
    tickets_1.default.findById(ticketId)
        .exec()
        .then((ticket) => {
        if (!ticket) {
            res.status(404).json({
                message: "Article does not exists",
            });
        }
        else {
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
exports.comments_get_comment = (req, res) => {
    const { commentId } = req.params;
    comment_1.default.findOne({ _id: commentId })
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
exports.comments_for_a_ticket = (req, res) => {
    const { ticketId } = req.params;
    comment_1.default.find({ ticket: ticketId })
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
exports.comments_delete_comment = (req, res) => {
    const { commentId } = req.params;
    comment_1.default.deleteOne({ _id: commentId })
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
//# sourceMappingURL=comments.js.map