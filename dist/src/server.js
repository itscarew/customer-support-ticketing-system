"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
//import all Routes
const users_1 = __importDefault(require("./routes/users"));
const tickets_1 = __importDefault(require("./routes/tickets"));
const comment_1 = __importDefault(require("./routes/comment"));
const reports_1 = __importDefault(require("./routes/reports"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//connection to the the Database
mongoose_1.default.connect(`mongodb+srv://itscarew:${process.env.MONGOPASSW0RD}@customer-support-ticket.kk7ya.mongodb.net/customer-support-ticket?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
//initialize express
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
//routes which should handle request
app.use("/user", users_1.default);
app.use("/ticket", tickets_1.default);
app.use("/comment", comment_1.default);
app.use("/reports", reports_1.default);
//listen to server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});
module.exports = app;
//# sourceMappingURL=server.js.map