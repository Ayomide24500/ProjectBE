"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const morgan_1 = __importDefault(require("morgan"));
const mainApp_1 = require("./mainApp");
const helmet_1 = __importDefault(require("helmet"));
const dbConfig_1 = require("./utils/dbConfig");
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const MongoDBStore = (0, connect_mongodb_session_1.default)(express_session_1.default);
const store = new MongoDBStore({
    uri: process.env.MONGO_DB_URL_ONLINE,
    collection: "sessions",
});
const port = process.env.port || 1200;
const app = (0, express_1.default)();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.APP_URL_DEPLOY);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 24 * 60,
        // sameSite: "lax",
        // secure: false,
        httpOnly: true,
        // domain: process.env.APP_URL_DEPLOY,
    },
    store,
}));
(0, mainApp_1.mainApp)(app);
(0, dbConfig_1.dbConfig)();
const server = app.listen(port, () => {
    console.log("connected 👌👍");
});
process.on("uncaughtException", (err) => {
    console.log("uncaughtException: ", err);
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
    console.log("unhandledRejection: ", reason);
    server.close(() => {
        process.exit(1);
    });
});
