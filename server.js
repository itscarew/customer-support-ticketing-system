const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//import all Routes
const userRoutes = require("./routes/users");
const ticketRoutes = require("./routes/tickets");
const commentRoutes = require("./routes/comment");
const reportsRoute = require("./routes/reports");

//connect to the the Database
mongoose.connect(`mongodb://localhost:27017/supportTicketApp`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

//initialize express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes which should handle request
app.use("/user", userRoutes);
app.use("/tickets", ticketRoutes);
app.use("/comment", commentRoutes);
app.use("/reports", reportsRoute);

//listen to server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
