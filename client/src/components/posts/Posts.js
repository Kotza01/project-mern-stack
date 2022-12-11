import React from "react";
import Post from "./Post/Post";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import {
  Grid,
  CircularProgress,
  Typography,
  Container,
} from "@material-ui/core";

const Posts = ({ setCurrentId }) => {
  /**Get post from state in redux */
  const { posts, isLoading } = useSelector((posts) => posts.posts);
  const classes = useStyles();

  if (!posts && !isLoading) return <h2>No Posts!!</h2>;

  /**If not have post push loading */
  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.length > 0 ? (
        posts.map((post) => (
          <Grid key={post._id} item lg={3} md={6} sm={12} xs={12}>
            <Post post={post} setCurrentId={setCurrentId}></Post>
          </Grid>
        ))
      ) : (
        <Container justifycontent="center" aligncontent="center">
          <Typography style={{ textAlign: "center" }} variant="h4">
            No matches
          </Typography>
        </Container>
      )}
    </Grid>
  );
};

export default Posts;
