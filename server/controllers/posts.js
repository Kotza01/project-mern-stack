import mongoose, { Mongoose } from "mongoose";
import postMessage from "../models/postMessage.js";

/**Function for get all posts in the data base */
export const getAllPosts = async (req, res) => {
  try {
    const post = await postMessage.find();

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**Function for createNewPost */
export const createPost = async (req, res) => {
  const post = req.body;
  console.log("req: ", req.userId);
  if (!req.userId) return res.status(404).json({ message: "Unauthenticated" });

  const newPost = postMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**Function for update post */
export const updatePost = async (req, res) => {
  let body = req.body;
  const { id: _id } = req.params;

  /**Validate that the id is true */
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  const update = await postMessage.findByIdAndUpdate(
    _id,
    { ...body, _id },
    { new: true }
  );

  res.status(200).json(update);
};

/**Function for delete post in the dataBase */
export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Incorret Id");

  await postMessage.findByIdAndRemove(_id);

  res.json({ message: "Deleted" });
};

/**Function for like to post*/
export const likeToPost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.status(404).json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "the id, is incorret" });

  /**Get post by id */
  let post = await postMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index !== -1) {
    post.likes = post.likes.filter((id) => id !== req.userId);
  } else {
    post.likes.push(req.userId);
  }

  /**Update post in the property likecount + 1 */
  let likedPost = await postMessage.findByIdAndUpdate(id, post, { new: true });

  res.json(likedPost);
};
