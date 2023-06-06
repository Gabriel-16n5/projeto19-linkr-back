import { Router } from "express";
import { deleteFollowers, postFollowers } from "../controllers/followers.controller.js";

const followersRouter = Router()

followersRouter.post("/followers", postFollowers);
followersRouter.delete("/followers/:idUser/:followedUser", deleteFollowers)

export default followersRouter;