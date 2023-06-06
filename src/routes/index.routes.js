import { Router } from "express";
import autenticationRouter from "./autentication.routes.js"
import timelineRouter from "./timeline.routes.js";
import hashtagRouter from "./hashtag.routes.js";
import userRouter from "./user.routes.js";
import followersRouter from "./followers.routes.js";

const router = Router()
router.use(autenticationRouter);
router.use(timelineRouter);
router.use(userRouter);
router.use(hashtagRouter);
router.use(followersRouter);

export default router
