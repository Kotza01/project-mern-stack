import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import { AppBar, Avatar, Typography, Toolbar, Button } from "@material-ui/core";

import markStyle from "./styles";
import memories from "../../images/memories.png";
import memoriesText from "../../images/memoriesText.png";
import { logout } from "../../actions/auth";

const Navbar = () => {
  const classes = markStyle();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  /**Effect for show data of user in the navbar */
  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodeToken = decode(token);
      if (decodeToken.exp * 1000 < new Date().getTime()) handleLogout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const handleLogout = () => {
    dispatch(logout(navigate));
    setUser(null);
  };

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img
          className={classes.image}
          src={memoriesText}
          alt="icon"
          height="40px"
        />
        <img
          className={classes.image}
          src={memories}
          alt="Memories"
          height="45"
        />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              className={classes.logout}
              onClick={() => handleLogout()}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sing in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
