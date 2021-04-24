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

// Like logic
export const likePost = async (req, res) => {
  const { id } = req.params;

  // Logic to make it so that a user can only like the post one time only.
  // We first need to check if the user is authenticated.
  if (!req.userId) return res.json({ message: 'Not authenticated' });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No post with that ID');

  // Find the post we're looking for.
  const post = await PostMessage.findById(id);

  // Check if the user's ID is already in the 'like' section or not.
  // Loop through each ID so we can see who (which of the users) liked a specific post.
  // If the ID is equal to 'req.userId' that means the ID is already in there, and means that the user already liked the post,
  // and this is going to be a 'dislike' and not a 'like'.
  const index = post.likes.findIndex((id) => id === String(req.userId));

  // Only if the ID is not found - only then is it going to equal -1.
  // This is for if the user wants to 'like' the post:
  if (index === -1) {
    // Like the post
    post.likes.push(req.userId);
  } else {
    // Get the index of the user's like and remove the user's like (i.e. dislike the post)
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  // Pass in the updates as the second parameter to 'findByIdAndUpdate' - this is going to be an object.
  // The third parameter is 'new: true', which is inside of an object.
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};
