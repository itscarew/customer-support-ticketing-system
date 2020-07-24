"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
//This is the Schema for a Comment, the sructure of how the comment document is going to be.
const CommentSchema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    content: {
        type: String,
        trim: true,
        required: [true, "Comments can't be left blank!"],
    },
    ticketId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Ticket",
        required: true,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});
const Comment = mongoose_1.default.model("Comment", CommentSchema);
exports.default = Comment;
//# sourceMappingURL=comment.js.map