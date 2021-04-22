// Authentication Middleware.
// The middleware here is going to be for Auth.
// This middleware allows a user to, once logged in, do certain actions, like deleting posts (this middleware says, okay, you are allowed to delete this post).

// This middleware is going to be used in the routes (see 'routes/posts.js') (for example, when somebody 'likes' something - see last example - notes / comments - below).

import jwt from 'jsonwebtoken';

// Create 'auth' function.
// This is similar to what we have in our controllers, in that it has 'req' and 'res'.
// BUT, our auth middleware has something called 'next'.
// That means, do something, and then move to the next thing.
const auth = async (req, res, next) => {
  try {
    // Check to see if the user is really who he/she is claiming to be - do this by using JSON Web Token.
    // After the user is signed up or signed in, he/she gets a token.
    // Now, when a user wants to do something, like create a post, delete a post, etc.,
    // we need to check if the user's token is valid, so get token from frontend
    // (the token is in the first position of the array [1]) after the array is split):
    const token = req.headers.authorization.split(' ')[1];

    // We're going to have two kinds of tokens (one from Google OAuth, and our own token).
    // Decide if token is our own token or Google OAuth's (if the length of the token is less than 500, that means it's our own token =>
    // if the length is greater than 500, it's going to be Google OAuth's token).
    const isCustomAuth = token.length < 500;

    // Create a variable - this is for the data that we want to get from the token itself:
    let decodedData;

    // If we have the token, and the token is our own token (a 'customAuth' token),
    // then we want to set the 'decodedData' to be equal to 'jwt.verify'.
    // Inside, we pass the 'token' and the 'secret' (from the controller - 'user.js'), which in our case is 'test' (it must be the same exact secret we use when that specific token is created).
    // This is going to give us the data from each specific token -
    // it's going to give us the username of the person, and it's ID:
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, 'test');

      // Now that we have the 'decodedData', we know which user is logged in, and which user is 'liking' a post, deleting a post, etc.
      // So we're going to store the user's ID in 'req.userId':
      req.userId = decodedData?.id;
    } else {
      // Get the user's ID if we are using Google OAuth's token.
      // In this case, we don't need a secret - just pass in the 'token':
      decodedData = jwt.decode(token);

      // 'sub' is simply Google's name for a specific ID that differentiates every single Google user.
      // Basically, it's an ID that we can differentiate the user's with.
      req.userId = decodedData?.sub;

      // Call 'next' so that we can pass the action onto the second thing (for example, if a user wanted to 'like' a post, the user needs to click the LIKE button,
      // then this is what happens: 1st, it is not immediately liked. This is because we're not sure if the user has permission to like it. So 1st, we go through the Auth Middleware.
      // The Auth Middleware confirms or denies this request.
      // So if all of this is correct, we're going to call 'next' and say, "You are okay to 'like' that post."
      // So, if Auth Middleware says, "you're good to go,", only then, are we going to call the 'like' controller.
      // And this is what middleware is for - for any kind of action that happens before something.
      // NEXT is crucial here - it says: do this, and then do something NEXT - do something after this is done. And this is a middleware).

      // Ex: click the like button => auth middleware (next) => like controller...
    }
  } catch (error) {
    console.log(error);
  }
};

export default auth;
