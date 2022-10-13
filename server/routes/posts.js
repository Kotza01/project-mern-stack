import express from "express";

const Routes = express.Router();
import { auth } from "../middleware/auth.js";

import {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  likeToPost,
} from "../controllers/posts.js";

Routes.get("/", getAllPosts);
Routes.post("/", auth, createPost);
Routes.patch("/:id", auth, updatePost);
Routes.delete("/:id", auth, deletePost);
Routes.patch("/:id/likePost", auth, likeToPost);

export default Routes;
