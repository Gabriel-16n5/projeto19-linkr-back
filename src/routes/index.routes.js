import { Router } from "express";
import autenticationRouter from "./autentication.routes.js"

const router = Router()
router.use(autenticationRouter);

export default router