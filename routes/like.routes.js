import express from "express";
import { addLike,removeLike } from "../controllers/like.controllers.js";
const router = express.Router();

router.post("/add", addLike);
router.post("/remove", removeLike);



export default router;
