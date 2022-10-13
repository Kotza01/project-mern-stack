import * as api from "../api";
import { FETCHAll, FETCHDELETE, FETCHSEND, FETCHUPDATE } from "../types";

/**Function for get all Post in the data base from server */
export const getPosts = () => async (dispatch) => {
  try {
    /**Get post from server by axios */
    const { data } = await api.fecthPosts();
    const actions = { type: FETCHAll, payload: data };
    /**Dispatch action for update state or do something in the reducer method */
    dispatch(actions);
  } catch (error) {
    console.log("erros.message");
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    /**Get post from server by axios */
    const { data } = await api.fetchCreatePosts(post);
    /**Dispatch action for update state or do something in the reducer method */
    dispatch({
      type: FETCHSEND,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (currentId, post) => async (dispatch) => {
  try {
    /**Get post from server by axios */
    const { data } = await api.fetchUpdatePost(currentId, post);
    /**Dispatch action for update state or do something in the reducer method */
    dispatch({ type: FETCHUPDATE, payload: data });
  } catch (error) {
    console.log({ error: error.message });
  }
};

/**Function for delete Post */
export const deletePost = (currentId) => async (dispatch) => {
  try {
    /**Delete  by id */
    await api.fetchDeletePost(currentId);
    /**Dispatch function */
    dispatch({ type: FETCHDELETE, payload: currentId });
  } catch (error) {
    console.log(error);
  }
};

/**Function for like to post */
export const likeToPost = (id) => async (dispatch) => {
  try {
    let { data } = await api.fetchLikeToPost(id);

    dispatch({ type: FETCHUPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
