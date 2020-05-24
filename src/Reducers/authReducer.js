import { ActionTypes } from '../actions';


const initialState = { authenticated: false, firstname: '', email: '' };

const authReducer = (state = initialState, action) => {
  console.log(action.type);
  console.log('this is the action type ^');
  console.log(action);
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return {
        ...state, authenticated: true, firstname: action.firstname, email: action.email,
      };
    case ActionTypes.DEAUTH_USER:
      return {
        ...state, authenticated: false, firstname: '', email: '',
      };
    case ActionTypes.AUTH_ERROR:
      return {
        ...state, authenticated: false, firstname: '', email: '',
      };
    default:
      return state;
  }
};

export default authReducer;
