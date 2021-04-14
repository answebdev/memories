import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

// Initialize the app.
// After doing this, we can now run all the methods in this app instance.
const app = express();

// General setup - set up body parser so we can appropriately send our requests
// We're going to be sending images, which can be large in size, so we want to set a limit.
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// Connect server application with real database (use MongoDB for this - the Cloud Atlas version of MongoDB)
const CONNECTION_URL =
  'mongodb+srv://answebdev:webmaster221@cluster0.iucus.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

// Connect to our database
mongoose
  .connect(CONNECTION_URL, {
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
