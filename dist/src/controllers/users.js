"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users_update_user_role = exports.users_delete_user = exports.users_get_user = exports.users_login_user = exports.users_register_user = exports.users_get_all = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
exports.users_get_all = (req, res) => {
    user_1.default.find()
        .exec()
        .then((users) => {
        res.status(200).json({ data: users });
    })
        .catch((err) => {
        res.status(500).json({
            message: err,
        });
    });
};
exports.users_register_user = (req, res) => {
    user_1.default.find({ email: req.body.email })
        .exec()
        .then((user) => {
        if (user.length >= 1) {
            return res.status(400).json({
                message: "Email Already Exists",
            });
        }
        else {
            bcryptjs_1.default.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        message: err,
                    });
                }
                else {
                    const user = new user_1.default({
                        _id: new mongoose_1.default.Types.ObjectId(),
                        name: req.body.name,
                        email: req.body.email,
                        password: hash,
                        role: req.body.role || "basic",
                    });
                    user
                        .save()
                        .then((user) => {
                        res.status(201).json({
                            message: "User ccreated successfully",
                            data: user,
                        });
                    })
                        .catch((err) => {
                        res.status(500).json({
                            message: err,
                        });
                    });
                }
            });
        }
    });
};
exports.users_login_user = (req, res) => {
    user_1.default.find({ email: req.body.email })
        .exec()
        .then((user) => {
        if (user.length < 1) {
            return res.status(401).json({
                message: "This User does not exist !",
            });
        }
        bcryptjs_1.default.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: "Authentication Failed, Password Incorrect",
                });
            }
            else if (result) {
                const token = jsonwebtoken_1.default.sign({ email: user[0].email, userId: user[0]._id }, "secret"
                // { expiresIn: "1h" }
                );
                return res.status(200).json({
                    message: "Authentication Successful",
                    token: token,
                    data: user,
                });
            }
            else
                res.status(401).json({
                    message: "Authentication Failed",
                });
        });
    })
        .catch((err) => {
        res.status(500).json({
            message: err,
        });
    });
};
exports.users_get_user = (req, res) => {
    const { userId } = req.params;
    user_1.default.find({ _id: userId })
        .exec()
        .then((user) => {
        res.status(200).json({
            message: "User found",
            data: user[0],
        });
    })
        .catch((err) => {
        res.status(400).json({
            message: "User not found",
            data: err,
        });
    });
};
exports.users_delete_user = (req, res) => {
    const { userId } = req.params;
    user_1.default.deleteOne({ _id: userId })
        .exec()
        .then(() => {
        res.status(200).json({
            message: "User Account deleted successfully",
        });
    })
        .catch((err) => {
        res.status(500).json({
            message: "No ticket found/Something went wrong",
        });
    });
};
exports.users_update_user_role = (req, res) => {
    const { userId } = req.params;
    user_1.default.updateOne({ _id: userId }, { $set: { role: req.body.role } })
        .exec()
        .then(() => {
        res.status(200).json({
            message: `User Account Role Updated to ${req.body.role} successfully`,
        });
    })
        .catch((err) => {
        res.status(500).json({
            message: "Something went wrong, User role not updated",
        });
    });
};
//# sourceMappingURL=users.js.map