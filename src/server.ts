import express, {Application} from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"


//import all Routes
import userRoutes from "./routes/users"
import ticketRoutes from "./routes/tickets"
import commentRoutes from "./routes/comment"
import reportsRoute from "./routes/reports"

import dotenv from "dotenv"
dotenv.config();

//connection to the the Database
mongoose.connect(
  `mongodb+srv://itscarew:${process.env.MONGOPASSW0RD}@customer-support-ticket.kk7ya.mongodb.net/customer-support-ticket?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

//initialize express
const app:Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes which should handle request
app.use("/user", userRoutes);
app.use("/ticket", ticketRoutes);
app.use("/comment", commentRoutes);
app.use("/reports", reportsRoute);

//listen to server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});

export = app