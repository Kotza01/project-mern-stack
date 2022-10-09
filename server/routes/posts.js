import express from "express";

const Routes = express.Router();

import { getAllPosts, createPost } from "../controllers/posts.js";

Routes.get("/", getAllPosts);

Routes.post("/", createPost);

export default Routes;
