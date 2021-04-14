// All the routes that have to do with posts.
import express from 'express';

import { getPosts } from '../controllers/posts.js';

// Set up the router.
const router = express.Router();

// http://localhost:5000/posts

// Add the routes.

// Move the callback function to 'posts.js' in 'controllers' (do for all routes).

// router.get('/', (req, res) => {
//   res.send('THIS WORKS!');
// });

// import 'getPosts' function for this route up above from 'posts.js' in 'controllers' and add it here as the second argument.
router.get('/', getPosts);

// Export the router.
export default router;
