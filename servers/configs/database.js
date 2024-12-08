import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO = process.env.MONGO_URL;

const CONNECT = async () => {
  try {
    await mongoose.connect(MONGO);

    console.log("Database Connected!");
  } catch (error) {
    console.log(error);
  }
};

export default CONNECT;
