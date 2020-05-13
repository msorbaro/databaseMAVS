import { ActionTypes } from '../actions';


const initialState = { authenticated: false, username: {}, email: {} };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return {
        ...state, authenticated: true, username: action.payload.username, email: action.payload.email,
      };
    case ActionTypes.DEAUTH_USER:
      return { ...state, authenticated: false, username: {} };
    case ActionTypes.AUTH_ERROR:
      return { ...state, authenticated: false, username: {} };
    default:
      return state;
  }
};

export default authReducer;
