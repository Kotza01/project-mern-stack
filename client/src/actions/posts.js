import * as api from "../api";
import {
  FETCHAll,
  FETCHDELETE,
  FETCHENDLOADING,
  FETCHGETONE,
  FETCHSEND,
  FETCHSTARTLOADING,
  FETCHUPDATE,
  FETCH_BY_SEARCH,
} from "../types";

/**Function for get all Post in the data base from server */
export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: FETCHSTARTLOADING });
    /**Get post from server by axios */
    const { data } = await api.fecthPosts(page);
    console.log(data);
    const actions = { type: FETCHAll, payload: data };
    /**Dispatch action for update state or do something in the reducer method */
    dispatch(actions);
    dispatch({ type: FETCHENDLOADING });
  } catch (error) {
    console.log("erros.message");
  }
};

/**Function for get one Post in the data base from server */
export const getOnePosts = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCHSTARTLOADING });
    /**Get post from server by axios */
    const { data } = await api.fecthOnePosts(id);
    const actions = { type: FETCHGETONE, payload: data };
    /**Dispatch action for update state or do something in the reducer method */
    dispatch(actions);
    dispatch({ type: FETCHENDLOADING });
  } catch (error) {
    console.log("erros.message");
  }
};

export const searchPost = (searchQuery) => async (dispatch) => {
  console.log("Search query action", searchQuery);
  try {
    dispatch({ type: FETCHSTARTLOADING });

    const {
      data: { data },
    } = await api.fecthPostsBySearch({
      search: searchQuery.search,
      tags: searchQuery.tags.join(","),
    });
    console.log(data);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: FETCHENDLOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post, navigate) => async (dispatch) => {
  try {
    /**Get post from server by axios */
    const { data } = await api.fetchCreatePosts(post);
    /**Dispatch action for update state or do something in the reducer method */
    dispatch({
      type: FETCHSEND,
      payload: data,
    });
    navigate(`/posts/${data._id}`);
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

/**Comment post */
export const commentPost = (value, id) => async (dispatch) => {
  try {
    let { data } = await api.fetchCommentPosts(id, { value });

    dispatch({ type: FETCHUPDATE, payload: data });

    return data.comments;
  } catch (error) {
    console.log(error);
  }
};
