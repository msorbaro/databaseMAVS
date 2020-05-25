import { ActionTypes } from '../actions';


const initialState = {
  allCompanies: [],
  specificCompany: {},
  specificCompanyPositions: {},
  reviews: {},
  allCompanyReviews: {},
  allCompanyRatings: null,
  allCompanyPositions: null,
};


const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_COMPANIES:
      return { ...state, allCompanies: action.payload };
    case ActionTypes.FETCH_COMPANY:
      return { ...state, specificCompany: action.payload };
    case ActionTypes.FETCH_COMPANY_POSITIONS:
      return { ...state, specificCompanyPositions: action.payload };
    case ActionTypes.FETCH_COMPANY_REVIEWS:
      return { ...state, reviews: action.payload };
    case ActionTypes.FETCH_ALL_REVIEWS:
      return { ...state, allCompanyReviews: action.payload };
    case ActionTypes.FETCH_ALL_RATINGS:
      return { ...state, allCompanyRatings: action.payload };
    case ActionTypes.FETCH_ALL_POSITIONS:
      return { ...state, allCompanyPositions: action.payload };
    default:
      return state;
  }
};

export default companyReducer;
