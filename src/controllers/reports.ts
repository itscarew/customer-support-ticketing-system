import {Parser} from "json2csv"
import fs from "fs"
import { Response} from "express"

import Ticket from "../models/tickets"

export const downloadReports = (req:any, res:Response) => {
  const date = new Date();
  date.toLocaleDateString();
  date.setMonth(date.getMonth() - 1);


  Ticket.find({
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

      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse(ticket);

      fs.writeFile("./src/download/tickets.csv", csv, function (err) {
        if (err) throw err;
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
