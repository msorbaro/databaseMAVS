import { ActionTypes } from '../actions';


const initialState = {
  allCompanies: [],
  specificCompany: {},
};


const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_COMPANIES:
      return { ...state, allCompanies: action.payload };
    // case ActionTypes.FETCH_ONE_COMPANY:
    //   return { ...state, specificCompany: action.payload };
    default:
      return state;
  }
};

export default companyReducer;
