import { ActionTypes } from '../actions';


const initialState = {
  firstname: '', email: '', lastname: '', major: '', gradYear: '',
};

const userReducer = (state = initialState, action) => {
  console.log('in user reducer');
  console.log(action);
  switch (action.type) {
    case ActionTypes.FETCH_USER:
      return {
        ...state,
        firstname: action.payload.FirstName,
        email: action.payload.Email,
        lastname: action.payload.LastName,
        major: action.payload.Major,
        gradYear: action.payload.GradYear,
      };
    default:
      return state;
  }
};

export default userReducer;
