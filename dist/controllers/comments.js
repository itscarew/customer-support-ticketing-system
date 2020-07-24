"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comments_delete_comment = exports.comments_for_a_ticket = exports.comments_get_comment = exports.comments_create_comment = exports.comments_get_all = void 0;
const comment_1 = __importDefault(require("../models/comment"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.comments_get_all = (req, res) => {
    comment_1.default.find()
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
    const comment = new comment_1.default({
        _id: mongoose_1.default.Types.ObjectId(),
        content: req.body.content,
        ticketId: req.body.ticketId,
        user: req.body.user
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
    comment_1.default.find({ _id: commentId }).populate("user", "_id name email ")
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
    comment_1.default.find({ ticketId: ticketId })
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
    comment_1.default.deleteOne({ _id: commentId })
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
//# sourceMappingURL=comments.js.map