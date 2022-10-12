import { Container, Grid, Grow } from "@material-ui/core";
import React from "react";
import Form from "../form/Form";
import Posts from "../posts/Posts";

const Home = ({ classes, currentId, setCurrentId }) => {
  return (
    <Grow in>
      <Container>
        <Grid
          container
          className={classes.mainContainer}
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId}></Posts>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId}></Form>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
