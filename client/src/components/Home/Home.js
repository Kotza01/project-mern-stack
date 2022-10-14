import {
  Container,
  Grid,
  Grow,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";

import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Form from "../form/Form";
import Posts from "../posts/Posts";
import Pagination from "../Pagination";
import useStyles from "./styles";
import { getPosts, searchPost } from "../../actions/posts";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  /**Id for update or send new Post */
  const [currentId, setCurrentId] = useState(null);
  const [tags, setTags] = useState([]);
  const [search, setSearch] = useState("");
  /**Styles */
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const query = useQuery();
  const page = query.get("page");
  const searchQuery = query.get("search");
  console.log(page, searchQuery);

  useEffect(() => {
    /**Get all post from server */
    dispatch(getPosts());
  }, [dispatch, currentId]);

  /**Handle press enter in the search button */
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (search || tags.length > 0) {
        dispatch(
          searchPost({
            search: search.trim() || "none",
            tags: tags || ["none"],
          })
        );
      } else {
        navigate("/");
      }
    }
  };

  const handleSearchButton = () => {
    if (search || tags.length > 0) {
      dispatch(
        searchPost({ search: search.trim() || "none", tags: tags || ["none"] })
      );
    } else {
      navigate("/");
    }
  };

  const handleAddTag = (tag) => setTags([...tags, tag]);

  const handleDeleteTags = (deleteTag) =>
    setTags(tags.filter((el) => el !== deleteTag));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          className={classes.mainContainer}
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId}></Posts>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onKeyDown={handleKeyDown}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                label="Search Tags"
                variant="outlined"
                onAdd={handleAddTag}
                onDelete={handleDeleteTags}
              />
              <Button
                className={""}
                variant="contained"
                color="primary"
                onClick={handleSearchButton}
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId}></Form>
            <Paper elevation={6}>
              <Pagination />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
