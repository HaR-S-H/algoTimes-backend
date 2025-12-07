import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectedDB from "./db/connection.js";
import logger from "./utils/Logger.js";
import "./cronjobs/article.cronjobs.js";
import "./cronjobs/headline.cronjobs.js";
import "./cronjobs/newsletter.cronjobs.js";
import limiter from "./middlewares/ratelimit.middlewares.js";
import headlineRoute from "./routes/headline.routes.js";
import articleRoute from "./routes/article.routes.js";
import likeRoute from "./routes/like.routes.js";
import razorpayRoute from "./routes/razorpay.routes.js";
import "./workers/email.workers.js";
dotenv.config();

const app = express();
app.use(cors(
    {
        origin: process.env.ORIGIN || "*",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", limiter);

app.use("/api/v1/headline", headlineRoute);
app.use("/api/v1/article", articleRoute);
app.use("/api/v1/like", likeRoute);
app.use("/api/v1/razorpay", razorpayRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    logger.info(`server is listening at port ${PORT}`);
    connectedDB();
});