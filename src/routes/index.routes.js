import { Router } from "express";
import autenticationRouter from "./autentication.routes.js"
import timelineRouter from "./timeline.routes.js";

const router = Router()
router.use(autenticationRouter);
router.use(timelineRouter);

export default router