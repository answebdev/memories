export default (posts = [], action) => {
  switch (action.type) {
    case 'FETCH_ALL':
      // 'action.payload' is our actual posts
      return action.payload;
    case 'CREATE':
      return [...posts, action.payload];
    default:
      return posts;
  }
};
