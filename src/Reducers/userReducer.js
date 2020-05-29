import { ActionTypes } from '../actions';


const initialState = {
  firstname: '', lastname: '', major: '', gradYear: '', reviews: null,
};


const userReducer = (state = initialState, action) => {
  // console.log('in user reducer');
  // console.log(action);
  switch (action.type) {
    case ActionTypes.FETCH_USER:
      console.log(action.payload.FirstName);
      console.log(state);
      return {
        ...state,
        firstname: action.payload.FirstName == null ? state.firstname : action.payload.FirstName,
        lastname: action.payload.LastName == null ? state.lastname : action.payload.LastName,
        major: action.payload.Major == null ? state.major : action.payload.Major,
        gradYear: action.payload.GradYear == null ? state.gradYear : action.payload.GradYear,
      };
    case ActionTypes.FETCH_USER_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
