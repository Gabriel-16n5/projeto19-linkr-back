import { Router } from "express";
import { getComments, createPost, getPost, deletePost, editPost, postLikes, deleteLikes, newPosts, postComments } from "../controllers/timeline.controller.js"
// import { auth } from "../middlewares/auth.middlewares.js"
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import {postSchema} from "../schemas/posts.schemas.js";

const timelineRouter = Router()

timelineRouter.post("/timeline", validateSchema(postSchema), createPost);
timelineRouter.get("/timeline/:num", getPost);
timelineRouter.post("/likes", postLikes);
timelineRouter.delete("/likes/:postId", deleteLikes)
timelineRouter.delete("/timeline/:id", deletePost);
timelineRouter.put("/timeline/:id", editPost);
timelineRouter.get("/newPosts", newPosts);
timelineRouter.get("/comments/:idPost", getComments);
timelineRouter.post("/comments", postComments);

export default timelineRouter;