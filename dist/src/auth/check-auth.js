"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
module.exports = (req, res, next) => {
    try {
        //Get token from the header
        const token = req.headers.authorization.split(" ")[1];
        //Verify the token with jsonwebtoken
        const decoded = jsonwebtoken_1.default.verify(token, "secret");
        req.userData = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: "Authentication Failed",
        });
    }
};
//# sourceMappingURL=check-auth.js.map