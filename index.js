import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectedDB from "./db/connection.js";
import logger from "./utils/Logger.js";
import "./cronjobs/article.cronjobs.js";
import "./cronjobs/headline.cronjobs.js";
import limiter from "./middlewares/ratelimit.middlewares.js";
import headlineRoute from "./routes/headline.routes.js";
import articleRoute from "./routes/article.routes.js";
import likeRoute from "./routes/like.routes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", limiter);

app.use("/api/v1/headline", headlineRoute);
app.use("/api/v1/article", articleRoute);
app.use("/api/v1/like", likeRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    logger.info(`server is listening at port ${PORT}`);
    connectedDB();
});