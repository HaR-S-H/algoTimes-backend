import express from "express";
import { getArticles,getOtherArticles,getArticlesByCategory, getArticlesBySearch } from "../controllers/article.controllers.js";
const router = express.Router();

router.get("/other", getOtherArticles);
router.get("/", getArticles);
router.get("/category", getArticlesByCategory);
router.get("/search", getArticlesBySearch);



export default router;
