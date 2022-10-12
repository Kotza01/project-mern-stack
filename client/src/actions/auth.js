import { AUTH, LOGOUT } from "../types";

export const auth = (result) => (dispatch) => {
  dispatch({ type: AUTH, payload: result });
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
