import express from "express";

const Routes = express.Router();

import {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  likeToPost,
} from "../controllers/posts.js";

Routes.get("/", getAllPosts);
Routes.post("/", createPost);
Routes.patch("/:id", updatePost);
Routes.delete("/:id", deletePost);
Routes.patch("/:id/likePost", likeToPost);

export default Routes;
