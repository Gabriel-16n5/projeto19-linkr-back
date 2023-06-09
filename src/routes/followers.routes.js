import { Router } from "express";
import { deleteFollowers, postFollowers, GetFollowers } from "../controllers/followers.controller.js";

const followersRouter = Router()

followersRouter.get("/followers/:idUser", GetFollowers);
followersRouter.post("/followers", postFollowers);
followersRouter.delete("/followers/:idUser/:followedUser", deleteFollowers)

export default followersRouter;