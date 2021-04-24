import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

// Create the actions - action creators.

// SIGN IN
// NOTE: If the action creators are asynchronous, then we have to use REDUX THUNK.
// This means that we have a function that returns an 'async' function with a 'dispatch', like we do here.

// And then we get what we pass into our function (see 'handleSubmit' function in Auth.js: 'formData' and 'history').
export const signin = (formData, history) => async (dispatch) => {
  try {
    // Send data to the database / the backend:
    // Log in user.
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });

    // Navigate to Home Page
    history.push('/');
  } catch (error) {
    console.log(error);
  }
};

// SIGN UP
export const signup = (formData, history) => async (dispatch) => {
  try {
    // Send data to the database / the backend:
    // Sign up user.
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });

    // Navigate to Home Page
    history.push('/');
  } catch (error) {
    console.log(error);
  }
};
