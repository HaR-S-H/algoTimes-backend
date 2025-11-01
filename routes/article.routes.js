import express from "express";
import { getArticles,getOtherArticles } from "../controllers/article.controllers.js";
const router = express.Router();

router.get("/other", getOtherArticles);
router.get("/", getArticles);



export default router;
