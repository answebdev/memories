import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

// Initialize the app.
// After doing this, we can now run all the methods in this app instance.
const app = express();

dotenv.config();

// General setup - set up body parser so we can appropriately send our requests
// We're going to be sending images, which can be large in size, so we want to set a limit.
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// Use Express middleware to connect our routes to the application.
// First parameter: Set up the starting parameter for ALL the routes in 'post.js'.
// Second parameter: set the route.
// So: Every route inside of 'postRoutes' is going to start with '/posts'.

// NOTE: This line needs to come AFTER this line: 'app.use(cors())'
// Otherwise we will get a CORS warning in the console.
app.use('/posts', postRoutes);

// User routes
app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello to Memories API');
});

const PORT = process.env.PORT || 5000;

// Connect to our database
// Connect server application with real database (use MongoDB for this - the Cloud Atlas version of MongoDB)
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  // If our connection is successful, we want to call our 'app' and 'listen' on it.
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  // If the connection to the database is not successful, we're going to have an error message.
  .catch((error) => console.log(error.message));

// This makes sure we don't get any warnings in the console.
mongoose.set('useFindAndModify', false);
