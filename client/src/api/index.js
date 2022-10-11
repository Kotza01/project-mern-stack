import axios from "axios";

const url = "http://localhost:5000/posts";

export const fecthPosts = () => axios.get(url);
export const fetchCreatePosts = (post) => axios.post(url, post);
