import { Router } from "express";
import { getPostsUser, getUser } from "../controllers/user.controller.js";

const userRouter = Router()

userRouter.get("/user/:id/:num", getPostsUser);
userRouter.get("/users/:name", getUser);

export default userRouter;


