import * as api from "../api";
import { FETCHAll, FETCHSEND } from "../types";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fecthPosts();
    const actions = { type: FETCHAll, payload: data };
    dispatch(actions);
  } catch (error) {
    console.log("erros.message");
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.fetchCreatePosts(post);
    dispatch({
      type: FETCHSEND,
      payload: data,
    });
  } catch (error) {
    console.log(error.message);
  }
};
