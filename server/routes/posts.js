// All the routes that have to do with posts.
import express from 'express';

// Set up the router.
const router = express.Router();

// http://localhost:5000/posts

// Add the routes.
router.get('/', (req, res) => {
  res.send('THIS WORKS!');
});

// Export the router.
export default router;
