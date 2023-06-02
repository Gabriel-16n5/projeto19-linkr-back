import { Router } from "express";
// import { createPost, getPost, deletePost, editPost, postLikes, deleteLikes } from "../controllers/timeline.controller.js"
import {getTrending,getPostsByHashtag} from "../controllers/hashtag.controller.js";
const hashtagRouter = Router()

hashtagRouter.get("/hashtag", getTrending);
hashtagRouter.get("/hashtag/:hashtag", getPostsByHashtag);


export default hashtagRouter;