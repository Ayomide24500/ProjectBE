import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const dbConfig = async () => {
  try {
    await connect(process.env.MONGODB_URL_ONLINE!);
    console.log("Database connection established🔥❤️🔥");
  } catch (error) {
    console.log("Error connecting to database:", error);
    throw error;
  }
};
