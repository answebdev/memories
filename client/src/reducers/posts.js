export default (posts = [], action) => {
  switch (action.type) {
    case 'DELETE':
      return posts.filter((post) => post._id !== action.payload);
    case 'UPDATE':
    case 'LIKE':
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case 'FETCH_ALL':
      // 'action.payload' is our actual posts
      return action.payload;
    case 'CREATE':
      return [...posts, action.payload];
    default:
      return posts;
  }
};

// Use this version?
// const reducer = (posts = [], action) => {
//   switch (action.type) {
//     case 'DELETE':
//       return posts.filter((post) => post._id !== action.payload);
//     case 'UPDATE':
//       return posts.map((post) =>
//         post._id === action.payload._id ? action.payload : post
//       );
//     case 'FETCH_ALL':
//       // 'action.payload' is our actual posts
//       return action.payload;
//     case 'CREATE':
//       return [...posts, action.payload];
//     default:
//       return posts;
//   }
// };

// export default reducer;
