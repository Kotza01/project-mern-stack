import React from "react";
import Post from "./Post/Post";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";

const Posts = ({ setCurrentId }) => {
  /**Get post from state in redux */
  const posts = useSelector((posts) => posts.posts);
  const classes = useStyles();
  console.log(posts);
  /**If not have post push loading */
  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item sm={6} xs={12}>
          <Post post={post} setCurrentId={setCurrentId}></Post>
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
