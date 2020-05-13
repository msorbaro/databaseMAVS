import { combineReducers } from 'redux';
import userReducer from './userReducer';
import companyReducer from './companyReducer';
import authReducer from './authReducer';


const rootReducer = combineReducers({
  user: userReducer,
  company: companyReducer,
  auth: authReducer,
});

export default rootReducer;
