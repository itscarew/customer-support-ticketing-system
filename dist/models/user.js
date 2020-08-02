"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const role_1 = require("../auth/role");
//This is the Schema for a User, the sructure of how the user document is going to be.
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        minlength: [6, "Name is too short!"],
        required: [true, "Your name cannot be blank!"],
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Your email cannot be blank!"],
    },
    password: {
        type: String,
        trim: true,
        required: [true, "Your password cannot be blank!"],
    },
    joined: { type: Date, default: Date.now },
    role: {
        type: String,
        default: role_1.role.BASIC,
        enum: [role_1.role.BASIC, role_1.role.AGENT, role_1.role.ADMIN],
    },
});
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
//# sourceMappingURL=user.js.map