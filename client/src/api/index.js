import axios from "axios";

const url = "http://localhost:5000/posts";

export const fecthPosts = () => axios.get(url);
export const fetchCreatePosts = (post) => axios.post(url, post);
export const fetchUpdatePost = (currentId, post) =>
  axios.patch(`${url}/${currentId}`, post);
export const fetchDeletePost = (id) => {
  axios.delete(`${url}/${id}`);
};
export const fetchLikeToPost = (id) => axios.patch(`${url}/${id}/likePost`);
