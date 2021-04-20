import { AUTH, LOGOUT } from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      // console.log(action?.data);
      // Save token in local storage so browser knows we're logged in even if we refresh the page.
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

      return { ...state, authData: action?.data };
    default:
      return state;
  }
};

export default authReducer;
