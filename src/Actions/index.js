/* eslint-disable */

import axios from 'axios';

// need to put in right url link here dependiunbg on API
const ROOT_URL = 'http://localhost:3000';

// This is where we add more actions when we need them.
export const ActionTypes = {
  FETCH_COMPANIES: 'FETCH_COMPANIES',
  FETCH_USER: 'FETCH_USER',
  AUTH_USER: 'AUTH_USER',

};
// example function where we are getting companies
export function fetchCompanies() {
  console.log("at least im here")
  return (dispatch) => {
    console.log( `${ROOT_URL}/api/companies`);
    console.log("myurl^")
    axios.get(`${ROOT_URL}/api/companies/`).then((response) => {
      console.log(response.data);
      console.log("I GOT A RESPONSE!!!")
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

export function signinUser({ email, password }, history) {
  console.log('at actions');
  return (dispatch) => {
    console.log('AFTER DISPATCH');
    console.log((`${ROOT_URL}/api/signin`));
    axios.put(`${ROOT_URL}/api/signin`, { email, password }).then((response) => {
      // const userInfo = { username: response.data.username, password: response.data.password };
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
      // localStorage.setItem('username', response.data.username);
      history.push('/');
    }).catch((error) => {
      console.log('theres an error');
      dispatch({ type: ActionTypes.AUTH_USER, payload: error });
      // setTimeout(() => { dispatch({ type: ActionTypes.CLEAR_ERROR }); }, 2000);
    });
  };
}
export function signupUser({ email, password, username }, history) {
  console.log(`${ROOT_URL}/api/signup`)
  console.log("Tryina hithere")

  console.log('at SignupUser');
  console.log({ email, password, username });
  console.log('persons info printed above');
  // takes in an object with email and password (minimal user object)

  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  return (dispatch) => {
    // does an axios.post on the /signup endpoint (only difference from above)
    console.log("AFTER DISPLATCE")

    axios.post(`${ROOT_URL}/api/signup`, { email, password, username }).then((response) => {
      // on success does:
      //  dispatch({ type: ActionTypes.AUTH_USER });
      dispatch({ type: ActionTypes.AUTH_USER });
      //  localStorage.setItem('token', response.data.token);
      localStorage.setItem('token', response.data.token);
      history.push('/');
    }).catch((error) => {
      // on error should dispatch(authError(`Sign Up Failed: ${error.response.data}`));
      dispatch(authError(`Sign Up Failed: ${error.response.data}`));
    });
  };
}

// export function signupUser(fields, history) {
//   console.log('got to  actions');
//   return (dispatch) => {
//     axios.post(`${ROOT_URL}/signup`, fields).then((response) => {
//       const userInfo = { username: response.data.username, email: response.data.email };
//       dispatch({ type: ActionTypes.AUTH_USER, payload: userInfo });
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('username', response.data.username);
//       localStorage.setItem('email', response.data.email);
//       history.push('/');
//     }).catch((error) => {
//       console.log('sign up failed');
//       dispatch(authError(`Sign Up Failed: ${error.response.data}`, error.response.status));
//       setTimeout(() => { dispatch({ type: ActionTypes.CLEAR_ERROR }); }, 2000);
//     });
//   };
// }


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
