"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const role_1 = require("./role");
module.exports = (req, res, next) => {
    try {
        //Get token from the header
        const token = req.headers.authorization.split(" ")[1];
        //Verify the token with jsonwebtoken
        const user = jsonwebtoken_1.default.verify(token, "secret");
        if (user.role === role_1.role.ADMIN || user.role === role_1.role.AGENT) {
            req.user = user;
            next();
        }
    }
    catch (error) {
        return res.status(403).json({
            err: "You don't have the priviledge to access this route !!",
        });
    }
};
//# sourceMappingURL=check-admin.js.map