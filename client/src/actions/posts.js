import * as api from '../api';

// Action Creators (functions that return actions).
// And an action is just an object with a 'type' and a 'payload'.
// 'payload' is the data where we store all our posts.
// We're working with asynchronous data because we are FETCHING posts.
// To get this data, some time elapses.
// So for that, we need to use Redux Thunk.

// (53:00 - Part 1): So, with Redux Thunk, since we're dealing with asynchronous logic (fetching the data),
// we have to add the 'async' dispatch function in front of it.
// And then, instead of returning the function, we dispatch it.

// Thunk allows us to specify an additional arrow function => 'async (dispatch) =>'
export const getPosts = () => async (dispatch) => {
  try {
    // Fetch data from API.
    // Here, we are using Redux to to pass (i.e., dispatch) an action from the data from our backend:
    const { data } = await api.fetchPosts();

    // With Redux Thunk, we 'dispatch' the action rather than 'return' it:
    // return action;
    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
