"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadReports = void 0;
const json2csv_1 = require("json2csv");
const fs_1 = __importDefault(require("fs"));
const tickets_1 = __importDefault(require("../models/tickets"));
exports.downloadReports = (req, res) => {
    const date = new Date();
    date.toLocaleDateString();
    date.setMonth(date.getMonth() - 1);
    tickets_1.default.find({
        closedAt: {
            $gte: date,
            $lte: new Date(),
        },
        status: "closed",
    })
        .sort({ closedAt: 1 })
        .exec()
        .then((ticket) => {
        const fields = [
            "_id",
            "description",
            "subject",
            "createdAt",
            "closedAt",
            "status",
            "user",
        ];
        const json2csvParser = new json2csv_1.Parser({ fields });
        const csv = json2csvParser.parse(ticket);
        fs_1.default.writeFile("./src/download/tickets.csv", csv, function (err) {
            if (err)
                throw err;
            res.setHeader("Content-Type", "text/csv");
            res.send(csv);
        });
    })
        .catch((err) => {
        res.status(500).json({
            err: "Tickets not saved",
        });
    });
};
//# sourceMappingURL=reports.js.map