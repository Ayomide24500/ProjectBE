import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// const URL = "mongodb://localhost:27017/pro";

export const dbConfig = async () => {
  try {
    return await connect(process.env.MONGODB_URL_ONLINE!).then(() => {
      console.log("database connection established🔥❤️🔥");
    });
  } catch (error) {
    console.error("Error connecting to database:", error);
    return error;
  }
};
