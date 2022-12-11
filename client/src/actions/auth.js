import { AUTH, LOGOUT } from "../types";
import * as api from "../api/index.js";

export const auth = (result) => (dispatch) => {
  dispatch({ type: AUTH, payload: result });
};

export const logout = (navigate) => (dispatch) => {
  dispatch({ type: LOGOUT, payload: navigate });
  navigate("/auth");
};

export const singIn = (dataForm) => async (dispatch) => {
  try {
    const { data } = await api.fetchSignIn(dataForm);
    dispatch({ type: AUTH, payload: data });
    return false;
  } catch (error) {
    return true;
  }
};

export const singUp = (dataForm, navigate) => async (dispatch) => {
  try {
    console.log("Estamos en la action");
    const { data } = await api.fetchSignUp(dataForm);
    dispatch({ type: AUTH, payload: data });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
