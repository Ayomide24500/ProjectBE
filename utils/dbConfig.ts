import env from "dotenv";
import { connect } from "mongoose";
env.config();

const URL: string = "mongodb://localhost:27017/pro";

export const dbConfig = async () => {
  try {
    await connect(URL).then(() => {
      console.log("Database connection established🔥❤️🔥");
    });
    console.log(connect);
  } catch (error) {
    console.log("Error connecting to database:", error);
    throw error;
  }
};
