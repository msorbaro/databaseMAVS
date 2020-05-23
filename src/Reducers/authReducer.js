import { ActionTypes } from '../actions';


const initialState = { authenticated: false, username: {}, email: {} };

const authReducer = (state = initialState, action) => {
  console.log(action.type);
  console.log('this is the action type ^');
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return { ...state, authenticated: true };
    case ActionTypes.DEAUTH_USER:
      return { ...state, authenticated: false };
    case ActionTypes.AUTH_ERROR:
      return { ...state, authenticated: false };
    default:
      return state;
  }
};

export default authReducer;
