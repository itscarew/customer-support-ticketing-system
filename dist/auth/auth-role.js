"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//This function takes in the role of the user passed in and to verify if the user is priviledge to perform certain tasks
const authRole = (...role) => {
    return (req, res, next) => {
        //Get token from the header
        const token = req.headers.authorization.split(" ")[1];
        //Verify the token with jsonwebtoken
        const decoded = jsonwebtoken_1.default.verify(token, "secret");
        req.userData = decoded;
        user_1.default.find({ _id: req.userData.userId })
            .exec()
            .then((user) => {
            if (user[0].role === role[0] || user[0].role === role[1]) {
                console.log(user[0].role, role[1]);
                return next();
            }
            else {
                console.log(user[0].role, role);
                res.status(404).json({
                    message: "You don't have such permission",
                });
            }
        })
            .catch((err) => {
            res.status(404).json({
                message: "Something Went Wrong",
            });
        });
    };
};
module.exports = authRole;
//# sourceMappingURL=auth-role.js.map