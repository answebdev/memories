// All the handlers for our routes go in this file.
// That means, we're going to extract all of the logic from the routes ('posts.js') and put them in here.
// This makes things easier because as we add more routes, our routes logic ('posts.js') will grow and become bigger and harder to read.

// In order to use this in our routes ('posts.js'), we need to export this.
export const getPosts = (req, res) => {
  res.send('THIS WORKS!');
};
