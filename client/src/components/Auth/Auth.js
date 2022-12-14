import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";
import { GoogleLogin } from "react-google-login";
import markStyle from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useEffect, useState } from "react";
import Input from "./Input";
import Icon from "./Icon";
import { auth, singIn, singUp } from "../../actions/auth";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const classes = markStyle();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [singInFailed, setSingInFailed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**Efect for login with google */
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "996695451824-49v8ptfgfrjgb0j37tm3g1ll19nbjhb1.apps.googleusercontent.com",
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  /**Dispatch function depending on whether you are singUp or singIn  */
  const handleSubmit = async (e) => {
    e.preventDefault();
    let successfullySingIn = true;
    if (isSignUp) {
      dispatch(singUp(formData, navigate));
    } else {
      successfullySingIn = await dispatch(singIn(formData));
    }
    setSingInFailed(successfullySingIn);
    if (!successfullySingIn) navigate("/");
  };

  /**Change show password or not */
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  /**Change value of the form input */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**Switch login and sing up */
  const switchMode = () => {
    setIsSignUp((prevSign) => !prevSign);
    setShowPassword(false);
  };

  const googleSuccess = async (success) => {
    /**get result, token and send to the backend for save
     */
    const result = success?.profileObj;
    const token = success?.tokenId;

    try {
      /**Dispatch function */
      dispatch(auth({ result, token }));
      /**Navigate to Home path */
      navigate("/");
    } catch (error) {
      console.log(error);
    }

    console.log("Connet to the google successfully");
  };

  const googleFailure = (error) => {
    /**Do everything about the error */
    console.log(error.details);
    console.log("Error when connect to google");
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={6}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">
            {isSignUp ? "Sing Up" : "Sing In"}
          </Typography>
          <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
            <Grid container spacing={2}>
              {isSignUp && (
                <>
                  <Input
                    name="firstName"
                    label="First Name"
                    handleChange={handleChange}
                    autoFocus
                    half
                  />

                  <Input
                    name="lastName"
                    label="Last Name"
                    handleChange={handleChange}
                    half
                  />
                </>
              )}
              <Input
                name="email"
                label="Email Addres"
                handleChange={handleChange}
                type="email"
              ></Input>
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              ></Input>
              {isSignUp && (
                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type="password"
                />
              )}
            </Grid>
            <Paper className={classes.singInFailed}>
              <Typography variant="h6">
                {singInFailed && "Password or gmail incorrect"}
              </Typography>
            </Paper>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isSignUp ? "Sing Up" : "Sing In"}
            </Button>
            <GoogleLogin
              clientId="996695451824-49v8ptfgfrjgb0j37tm3g1ll19nbjhb1.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained"
                >
                  Google Sing in
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignUp
                    ? "Already have an account? Sign In"
                    : "Don??t have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Auth;
