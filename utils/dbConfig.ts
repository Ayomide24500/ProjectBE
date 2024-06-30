import env from "dotenv";
import { connect } from "mongoose";

env.config();

const URL1: string | any = process.env.MONGODB_URL_ONLINE!;
// const URL: string = "mongodb://localhost:27017/pro";

export const dbConfig = async () => {
  try {
    await connect(URL1).then(() => {
      console.log("Database connection established🔥❤️🔥");
    });
  } catch (error) {
    console.log("Error connecting to database:", error);
    throw error;
  }
};

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
