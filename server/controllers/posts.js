// All the handlers for our routes go in this file.
// That means, we're going to extract all of the logic from the routes ('posts.js') and put them in here.
// This makes things easier because as we add more routes, our routes logic ('posts.js') will grow and become bigger and harder to read.
import mongoose from 'mongoose';

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

// Add post.
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

// Update post.
export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No post with that ID');

  // Call the model
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );

  // Send over the updated post.
  res.json(updatedPost);
};

// Delete post.
export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No post with that ID');

  // Delete post - pass in the 'id' we receive from the 'params' above.
  await PostMessage.findByIdAndRemove(id);

  console.log('DELETE');

  res.json({ message: 'Post deleted successfully' });
};
