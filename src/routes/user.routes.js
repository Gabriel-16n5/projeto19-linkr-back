import { Router } from "express";
import { getPostsUser } from "../controllers/autenticationController.js";

const userRouter = Router()

userRouter.get("/user/:id", getPostsUser);

export default userRouter;


