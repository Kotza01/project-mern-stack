import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { getPosts } from "./actions/posts";
import { useDispatch } from "react-redux";
import { HashRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import useStyles from "./styles.js";
import "./index.css";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => {
  /**Id for update or send new Post */
  const [currentId, setCurrentId] = useState(null);
  /**Styles */
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    /**Get all post from server */
    dispatch(getPosts());
  }, [dispatch, currentId]);

  return (
    <HashRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route
            index
            element={
              <Home
                classes={classes}
                currentId={currentId}
                setCurrentId={setCurrentId}
              />
            }
          />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Container>
    </HashRouter>
  );
};

export default App;
