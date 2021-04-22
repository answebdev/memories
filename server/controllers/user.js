// The actual logic for signing in and signing (controllers) up goes in here.
// 'bcrypt' is used to hash the password for security.
import bcrypt from 'bcryptjs';

// 'jwt' is a safe way to store the users - store the user in the browser for a period of time (e.g. one hour, two hours, etc.) -
// that way, the user can stay logged in in the browser.
// For this, we need to use the User Model (see 'models/user.js').
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// Controllers

// Signin
export const signin = async (req, res) => {
  // We need to get 2 things from the frontend: email and password => use destructuring to get this.
  // All the data that is sent from the frontend in the POST request is available in the 'req.body',
  // so we destructure to get what we need (email, password) from there.
  const { email, password } = req.body;

  // Since we're in an 'async' block, we use try/catch block
  try {
    // Get the existing user - find the user by email (this looks for the existing user in the database)
    const existingUser = await User.findOne({ email });

    // If there is no such existing user:
    if (!existingUser)
      return res.status(404).json({ message: 'User does not exist.' });

    // If the user exists, check that the password is correct - if the typed in password is the same password that was created when the user initially created the account
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    // If password is not correct
    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Invalid credentials.' });

    // If user exists and password is correct, get user's JSON Web Token, and send it to the frontend.
    // Provide all the information we want to store in the token (email and id) and the SECRET string that only you know (usually, this would be put in a separate .env file).
    // Here, the SECRET string will just be 'test'.
    // Finally, we have an 'options' object. One option we'll use is 'expiresIn: "1h"' ("1h" means 1 hour).
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      'test',
      { expiresIn: '1h' }
    );

    // Return it
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    // '500' is an undefined server error
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

// Signup
export const signup = async (req, res) => {
  // Destructure and get the information that we get when a user signs up from the frontend
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: 'User already exists.' });

    // If the user does not exists, it means the user can continue and create an account.
    // Check if password matches confirmed password
    if (password !== confirmPassword)
      return res.status(400).json({ message: 'Passwords do not match.' });

    // If we do not have existing user and if the passwords DO match, a new user can be created.
    // But first, we need to hash the password (we don't want to store tha password in plain text).
    // 'salt' is the level of difficulty that you want to use to hash the password - '12' is usually used.
    const hashPassword = await bcrypt.hash(password, 12);

    // Create user
    const result = await User.create({
      email,
      password: hashPassword,
      name: `${firstName} ${lastName}`,
    });

    // Create the token
    const token = jwt.sign({ email: result.email, id: result._id }, 'test', {
      expiresIn: '1h',
    });
    // Return the user
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};
