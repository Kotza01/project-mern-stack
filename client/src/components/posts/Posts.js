import React from "react";
import Post from "./Post/Post";
import useStyles from "./styles";
import { useSelector } from "react-redux";

const Posts = () => {
  const post = useSelector((posts) => posts.posts);
  console.log("Posts from post component", post);
  const classes = useStyles();

  return (
    <>
      <div>Posts</div>
      <Post></Post>
      <Post></Post>
      <Post></Post>
    </>
  );
};

export default Posts;
