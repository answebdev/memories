import axios from 'axios';

// URL that points to our backend route.
// This will return all of the posts that are currently in the database.
const url = 'http://localhost:5000/posts';

// Export function so that it can be used in another file.
export const fetchPosts = () => axios.get(url);
