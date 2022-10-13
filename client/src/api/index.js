import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

const POSTS = "/posts";
const USERS = "/users";

/**petition to post */
export const fecthPosts = () => API.get(POSTS);
export const fetchCreatePosts = (post) => API.post(POSTS, post);
export const fetchUpdatePost = (currentId, post) =>
  API.patch(`${POSTS}/${currentId}`, post);
export const fetchDeletePost = (id) => API.delete(`${POSTS}/${id}`);
export const fetchLikeToPost = (id) => API.patch(`${POSTS}/${id}/likePost`);

/**Petition to users */
export const fetchSignIn = (formData) => API.post(`${USERS}/signin`, formData);
export const fetchSignUp = (formData) => API.post(`${USERS}/signup`, formData);
