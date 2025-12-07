import express from "express";
import { getHeadlines, getOtherHeadlines } from "../controllers/headline.controllers.js";

const router = express.Router();

router.get("/", getHeadlines);
router.get("/other", getOtherHeadlines);

export default router;