import axios from 'axios';

// need to put in right url link here dependiunbg on API
const ROOT_URL = 'https://localhost:3000/';

// This is where we add more actions when we need them.
export const ActionTypes = {
  FETCH_COMPANIES: 'FETCH_COMPANIES',
  FETCH_USER: 'FETCH_USER',
};
// example function where we are getting companies
export function fetchCompanies() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/companies`).then((response) => {
      dispatch({
        type: ActionTypes.FETCH_COMPANIES,
        payload: response.data,
      });
    }).catch((error) => {
      dispatch({ type: ActionTypes.ERROR, payload: { error: error.message } });
      setTimeout(() => { dispatch({ type: ActionTypes.CLEAR_ERROR }); }, 2000);
    });
  };
}

// example function to get the current user
export function fetchUser(username) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/user/${username}`, { headers: { authorization: localStorage.getItem('token') } }).then((res) => {
      dispatch({ type: ActionTypes.FETCH_USER, payload: res.data });
    })
      .catch(((error) => {
        dispatch({ type: 'ERROR', payload: { error: error.message } });
        setTimeout(() => { dispatch({ type: ActionTypes.CLEAR_ERROR }); }, 2000);
      }));
  };
}

/** *
This is all the signout / up / in stuff we would need
* */
// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error, code) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
    statusCode: code,
  };
}

export function signinUser(fields, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, fields).then((response) => {
      const userInfo = { username: response.data.username, email: response.data.email };
      dispatch({ type: ActionTypes.AUTH_USER, payload: userInfo });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      history.push('/');
    }).catch((error) => {
      dispatch(authError(`Sign In Failed: ${error.response.data}`, error.response.status));
      setTimeout(() => { dispatch({ type: ActionTypes.CLEAR_ERROR }); }, 2000);
    });
  };
}


export function signupUser(fields, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, fields).then((response) => {
      const userInfo = { username: response.data.username, email: response.data.email };
      dispatch({ type: ActionTypes.AUTH_USER, payload: userInfo });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('email', response.data.email);
      history.push('/');
    }).catch((error) => {
      dispatch(authError(`Sign Up Failed: ${error.response.data}`, error.response.status));
      setTimeout(() => { dispatch({ type: ActionTypes.CLEAR_ERROR }); }, 2000);
    });
  };
}


// deletes token from localstorage
// and deauths
export function signoutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    history.push('/');
  };
}
