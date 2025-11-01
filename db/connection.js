import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "../utils/Logger.js";
dotenv.config();

const connectedDB = async () => {
    //   logger.info("MONGODB URL: " + process.env.MONGODB_URL);
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        logger.info("MONGODB CONNECTED")

    } catch (error) {
        logger.error(error.message);
        logger.error("MONGODB CONNECTION FAILED")
    }
}

export default connectedDB;