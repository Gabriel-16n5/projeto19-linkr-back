import { Router } from "express";
import autenticationRouter from "./autentication.routes.js"
import timelineRouter from "./timeline.routes.js";
import hashtagRouter from "./hashtag.routes.js";

const router = Router()
router.use(autenticationRouter);
router.use(timelineRouter);
router.use(hashtagRouter);

export default router