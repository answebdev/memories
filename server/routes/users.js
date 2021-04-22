// All the routes that have to do with users.
import express from 'express';

// Get the controllers
import { signin, signup } from '../controllers/user.js';

// Set up the router.
const router = express.Router();

// Use POST because we are sending data to the backend (i.e., the signin credentials).
// The second argument is the 'signin' controller.
router.post('/signin', signin);
router.post('/signup', signup);

export default router;
