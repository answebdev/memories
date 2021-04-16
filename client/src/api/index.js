import axios from 'axios';

// URL that points to our backend route.
// This will return all of the posts that are currently in the database.
const url = 'http://localhost:5000/posts';

// Export functions so that they can be used in another file (e.g., actions/posts.js)
export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) =>
  axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
