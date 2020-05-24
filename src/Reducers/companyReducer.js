import { ActionTypes } from '../actions';


const initialState = {
  allCompanies: [],
  specificCompany: {},
  specificCompanyPositions: {},
};


const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_COMPANIES:
      return { ...state, allCompanies: action.payload };
    case ActionTypes.FETCH_COMPANY:
      return { ...state, specificCompany: action.payload };
    case ActionTypes.FETCH_COMPANY_POSITIONS:
      return { ...state, specificCompanyPositions: action.payload };
    default:
      return state;
  }
};

export default companyReducer;
