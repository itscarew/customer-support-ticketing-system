const { Parser } = require("json2csv");
const fs = require("fs");

const Ticket = require("../models/tickets");

exports.downloadReports = (req, res) => {
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
        "userId",
      ];

      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse(ticket);

      fs.writeFile("./download/tickets.csv", csv, function (err) {
        if (err) throw err;
        res.setHeader("Content-Type", "text/csv");
        res.send(csv);
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Tickets not saved",
      });
    });
};
