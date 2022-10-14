import React from "react";
import { Container } from "@material-ui/core";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import "./index.css";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <HashRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route index element={<Navigate to="/posts" replace={true} />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route
            path="/auth"
            element={user ? <Navigate to="/posts" replace={true} /> : <Auth />}
          />
        </Routes>
      </Container>
    </HashRouter>
  );
};

export default App;
