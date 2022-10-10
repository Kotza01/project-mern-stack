import * as api from "../api";
import { FETCHAll } from "../types";

export const getPosts = () => async (dispatch) => {
  try {
    console.log("fetch petition");
    const { data } = await api.fecthPosts();
    console.log(`data of post: ${data}`);
    const actions = { type: FETCHAll, payload: data };
    dispatch(actions);
  } catch (error) {
    console.log("erros.message");
  }
};
