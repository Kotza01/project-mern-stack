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
export const fecthPosts = (page) => API.get(`POSTS?page=${page}`);
export const fecthOnePosts = (id) => API.get(`${POSTS}/${id}`);
export const fecthPostsBySearch = (querySearch) =>
  API.get(
    `${POSTS}/search?searchQuery=${querySearch.search}&tags=${querySearch.tags}`
  );
export const fetchCreatePosts = (post) => API.post(POSTS, post);
export const fetchUpdatePost = (currentId, post) =>
  API.patch(`${POSTS}/${currentId}`, post);
export const fetchDeletePost = (id) => API.delete(`${POSTS}/${id}`);
export const fetchLikeToPost = (id) => API.patch(`${POSTS}/${id}/likePost`);
export const fetchCommentPosts = (id, value) =>
  API.patch(`${POSTS}/${id}/comment`, value);

/**Petition to users */
export const fetchSignIn = (formData) => API.post(`${USERS}/signin`, formData);
export const fetchSignUp = (formData) => API.post(`${USERS}/signup`, formData);
