import { Router } from "express";
import { createPost, getPost, deletePost, editPost } from "../controllers/timeline.controller.js"
// import { auth } from "../middlewares/auth.middlewares.js"
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import {postSchema} from "../schemas/posts.schemas.js";

const timelineRouter = Router()

timelineRouter.post("/timeline", validateSchema(postSchema), createPost);
timelineRouter.get("/timeline", getPost);
timelineRouter.delete("/timeline/:id", deletePost);
timelineRouter.put("/timeline/:id", editPost);

export default timelineRouter;