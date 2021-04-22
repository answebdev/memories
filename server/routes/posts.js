// All the routes that have to do with posts.
import express from 'express';

// Get the controllers
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from '../controllers/posts.js';

// Import our middlware (since we're in the backend, we need to use the '.js' file extension).
import auth from '../middleware/auth.js';

// Set up the router.
const router = express.Router();

// http://localhost:5000/posts

// Add the routes.

// Move the callback function to 'posts.js' in 'controllers' (do for all routes).

// router.get('/', (req, res) => {
//   res.send('THIS WORKS!');
// });

// MIDDLEWARE NOTE:
// Add our middleware BEFORE specific actions
// For example, all users, no matter if they are logged in or not, can see all the posts.
// But to create a post, you need to have your own ID - you need to be logged in.
// So down in 'createPost', we need to add our 'auth' middleware before the 'createPost' action.
// And the same for 'updatePost', 'deletePost', and 'likePost' (for liking a post, although ANYBODY can 'like' a post,
// a user cannot 'like' a post more than once; that's we we add the 'auth' middleware to 'likePost' - that way,
// we can have the specific user's ID, so that the user can only 'like' ONCE for that specific ID).

// import 'getPosts' function for this route up above from 'posts.js' in 'controllers' and add it here as the second argument.
router.get('/', getPosts);

// Pass in our 'auth' middleware BEFORE the 'createPost' action:
router.post('/', auth, createPost);

// 'patch' is used for updating existing documents.
router.patch('/:id', auth, updatePost);

// Route for Delete.
router.delete('/:id', auth, deletePost);

// Route for Liking.
// Since liking something is 'updating' something (it's updating the number of 'likes' a post has), use 'patch'.
router.patch('/:id/likePost', auth, likePost);

// Export the router.
export default router;
