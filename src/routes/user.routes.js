import { Router } from "express";
import { getPostsUser } from "../controllers/user.controller.js";

const userRouter = Router()

userRouter.get("/user/:id", getPostsUser);

export default userRouter;


