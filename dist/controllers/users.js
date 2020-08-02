"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users_update_user_role = exports.users_delete_user = exports.users_get_user = exports.users_get_logged_in_user_profile = exports.users_login_user = exports.users_register_user = exports.users_get_all = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
exports.users_get_all = (req, res) => {
    user_1.default.find()
        .exec()
        .then((user) => {
        res.status(200).json({ users: user });
    })
        .catch((err) => {
        res.status(500).json({
            err: err,
        });
    });
};
exports.users_register_user = (req, res) => {
    user_1.default.find({ email: req.body.email })
        .exec()
        .then((user) => {
        if (user.length >= 1) {
            return res.status(400).json({
                err: "Email Already Exists",
            });
        }
        else {
            bcryptjs_1.default.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        err: err,
                    });
                }
                else {
                    const user = new user_1.default({
                        name: req.body.name,
                        email: req.body.email,
                        password: hash,
                        role: req.body.role,
                    });
                    user
                        .save()
                        .then((user) => {
                        res.status(201).json({
                            message: "User created successfully",
                            user: user,
                        });
                    })
                        .catch((err) => {
                        res.status(500).json({
                            err: err,
                        });
                    });
                }
            });
        }
    });
};
exports.users_login_user = (req, res) => {
    user_1.default.findOne({ email: req.body.email })
        .exec()
        .then((user) => {
        if (!user) {
            return res.status(401).json({
                err: "This User does not exist !",
            });
        }
        bcryptjs_1.default.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    err: "Authentication Failed, Password Incorrect",
                });
            }
            else if (result) {
                const token = jsonwebtoken_1.default.sign({
                    name: user.name,
                    email: user.email,
                    joined: user.joined,
                    userId: user._id,
                    role: user.role
                }, "secret"
                // { expiresIn: "1h" }
                );
                return res.status(200).json({
                    message: "Authentication Successful",
                    token: token,
                    user: user,
                });
            }
            else
                res.status(401).json({
                    err: "Authentication Failed",
                });
        });
    })
        .catch((err) => {
        res.status(500).json({
            err: err,
        });
    });
};
exports.users_get_logged_in_user_profile = (req, res) => {
    user_1.default.findOne({ _id: req.user.userId })
        .exec()
        .then((user) => {
        if (!user) {
            res.status(404).json({ err: "No user is Logged In" });
        }
        else
            res.status(200).json({ user: user });
    })
        .catch((err) => {
        res.status(500).json({ err: err });
    });
};
exports.users_get_user = (req, res) => {
    const { userId } = req.params;
    user_1.default.findOne({ _id: userId })
        .exec()
        .then((user) => {
        if (!user) {
            res.status(404).json({
                err: "No user exists",
            });
        }
        res.status(200).json({
            message: "User found",
            user,
        });
    })
        .catch((err) => {
        res.status(500).json({
            err: err,
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
        res.status(404).json({
            err: "No ticket found/Something went wrong",
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
            err: "Something went wrong, User role not updated",
        });
    });
};
//# sourceMappingURL=users.js.map