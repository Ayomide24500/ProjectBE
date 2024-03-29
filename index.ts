import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import session from "express-session";
import morgan from "morgan";
import { mainApp } from "./mainApp";
// import helmet from "helmet";
import { dbConfig } from "./utils/dbConfig";

import MongoDB from "connect-mongodb-session";
import dotenv from "dotenv";
dotenv.config();

const MongoDBStore = MongoDB(session);
const store = new MongoDBStore({
  uri: process.env.MONGODB_URL_ONLINE!,
  collection: "sessions",
});

const port: number | string = process.env.port || 1200;

const app: Application = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", process.env.APP_URL_DEPLOY);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// app.use(helmet());
// app.use(morgan("dev"));

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,

    cookie: {
      maxAge: 1000 * 60 * 24 * 60,
      sameSite: "lax",
      secure: false,
      httpOnly: true,
      domain: process.env.APP_URL_DEPLOY,
    },

    store,
  })
);

mainApp(app);
const server = app.listen(port, async () => {
  console.clear();
  console.log("connected 👌👍");
  dbConfig();
});

process.on("uncaughtException", (err: Error) => {
  console.log("uncaughtException: ", err);

  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("unhandledRejection: ", reason);

  server.close(() => {
    process.exit(1);
  });
});
