// All the handlers for our routes go in this file.
// That means, we're going to extract all of the logic from the routes ('posts.js') and put them in here.
// This makes things easier because as we add more routes, our routes logic ('posts.js') will grow and become bigger and harder to read.

// Import our model.
import PostMessage from '../models/postMessage.js';

// In order to use this in our routes ('posts.js'), we need to export this.
export const getPosts = async (req, res) => {
  try {
    // Retrieve all the posts from the database.
    // Finding something inside the model takes time - this means that it is an asynchronous action =>
    // add 'await' in front of it, and make the function asynchronous ('async') up above.
    const postMessages = await PostMessage.find();
    console.log(postMessages);
    // Everything is okay and return JSON, which is going to be an array of all the messages that we have.
    res.status(200).json(postMessages);

    // Handle the error.
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Add posts.
export const createPost = async (req, res) => {
  //   res.send('Post Creation');
  const post = req.body;

  // Create a new post.
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
