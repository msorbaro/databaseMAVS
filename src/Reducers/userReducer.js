import { ActionTypes } from '../actions';


const initialState = { username: '', email: '' };

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_USER:
      return {
        ...state,
        username: action.payload.username,
        email: action.payload.email,
      };
    default:
      return state;
  }
};

export default userReducer;
