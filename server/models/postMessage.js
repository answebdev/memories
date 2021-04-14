import mongoose from 'mongoose';

// Create a Mongoose Schema.
// Mongoose allows us to give some uniformity to our documents.
// We are going to specify that each post is going to have a title, message, creator, etc.
const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// Turn the Schema into a Model.
const PostMessage = mongoose.model('PostMessage', postSchema);

// Export the Mongoose model.
export default PostMessage;
