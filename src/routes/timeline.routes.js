import { Router } from "express";
import { createPost, getPost, deletePost, editPost } from "../controllers/timeline.controller.js"
import { auth } from "../middlewares/auth.middlewares.js"
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import {postsSchema} from "../schemas/posts.schemas.js";

const timelineRouter = Router()

timelineRouter.post("/timeline", auth, validateSchema(postsSchema), createPost);
timelineRouter.get("/timeline", auth, getPost);
timelineRouter.delete("/timeline/:id", auth, deletePost);
timelineRouter.put("/timeline/:id", auth, editPost);

export default timelineRouter;