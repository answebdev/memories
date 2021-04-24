import axios from 'axios';

// Axios Instant
const API = axios.create({ baseURL: 'http://localhost:5000' });

// URL that points to our backend route.
// This will return all of the posts that are currently in the database.

//const url = 'https://me-mories.herokuapp.com/posts';
// const url = 'http://localhost:5000';

// Export functions so that they can be used in another file (e.g., actions/posts.js)
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

// Authentication
// The second argument ('formData') is the payload that is sent.
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

// ORIGINAL FROM PARTS 1 and 2
// import axios from 'axios';

// // URL that points to our backend route.
// // This will return all of the posts that are currently in the database.
// const url = 'https://me-mories.herokuapp.com/posts';

// // Export functions so that they can be used in another file (e.g., actions/posts.js)
// export const fetchPosts = () => axios.get(url);
// export const createPost = (newPost) => axios.post(url, newPost);
// export const updatePost = (id, updatedPost) =>
//   axios.patch(`${url}/${id}`, updatedPost);
// export const deletePost = (id) => axios.delete(`${url}/${id}`);
// export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
