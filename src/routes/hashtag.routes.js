import { Router } from "express";
// import { createPost, getPost, deletePost, editPost, postLikes, deleteLikes } from "../controllers/timeline.controller.js"
import {getTrending,getPostsByHashtag, postTags} from "../controllers/hashtag.controller.js";
const hashtagRouter = Router()

hashtagRouter.post("/hashtag", postTags);
hashtagRouter.get("/hashtag", getTrending);
hashtagRouter.get("/hashtag/:hashtag/:num", getPostsByHashtag);


export default hashtagRouter;