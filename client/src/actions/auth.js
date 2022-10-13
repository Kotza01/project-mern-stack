import { AUTH, LOGOUT } from "../types";
import * as api from "../api/index.js";

export const auth = (result) => (dispatch) => {
  dispatch({ type: AUTH, payload: result });
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

export const singIn = (dataForm, navigate) => async (dispatch) => {
  try {
    const { data } = await api.fetchSignIn(dataForm);
    dispatch({ type: AUTH, payload: data });
    navigate("/");
  } catch (error) {
    console.log(error);
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
