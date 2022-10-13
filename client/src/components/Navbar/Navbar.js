import { AppBar, Avatar, Typography, Toolbar, Button } from "@material-ui/core";
import { Link, useLocation, useNavigate } from "react-router-dom";
import memories from "../../images/memories.png";
import React, { useEffect, useState } from "react";
import markStyle from "./styles";
import decode from "jwt-decode";
import { logout } from "../../actions/auth";
import { useDispatch } from "react-redux";

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
    dispatch(logout());
    navigate("/auth");
    setUser(null);
  };

  console.log(typeof user);
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="Memories"
          height="60"
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
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
