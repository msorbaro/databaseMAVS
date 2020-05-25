/* eslint-disable */

import axios from 'axios';

// need to put in right url link here dependiunbg on API
const ROOT_URL = 'http://localhost:3000';

// This is where we add more actions when we need them.
export const ActionTypes = {
  FETCH_COMPANIES: 'FETCH_COMPANIES',
  FETCH_USER: 'FETCH_USER',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  CLEAR_ERROR: 'CLEAR_ERROR',
  FETCH_COMPANY: 'FETCH_COMPANY',
  FETCH_COMPANY_POSITIONS: 'FETCH_COMPANY_POSITIONS',
  FETCH_COMPANY_REVIEWS: 'FETCH_COMPANY_REVIEWS',
};
// example function where we are getting companies
export function fetchCompanies() {
  console.log("at least im here")
  return (dispatch) => {
    console.log( `${ROOT_URL}/api/companies`);
    console.log("myurl^")
    axios.get(`${ROOT_URL}/api/companies/`).then((response) => {
    //  console.log(response.data);
      console.log("I GOT A RESPONSE!!!")
      console.log(response.data.response)
      dispatch({
        type: ActionTypes.FETCH_COMPANIES,
        payload: response.data.response,
      });
    }).catch((error) => {
      dispatch({ type: ActionTypes.ERROR, payload: { error: error.message } });
      setTimeout(() => { dispatch({ type: ActionTypes.CLEAR_ERROR }); }, 2000);
    });
  };
}

export function fetchCompany(name) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/api/companies/${name}/info`).then((res) => {
      dispatch({ type: ActionTypes.FETCH_COMPANY, payload: res.data.response[0] });
    })
      .catch(((error) => {
        dispatch({ type: 'ERROR', payload: { error: error.message } });
        setTimeout(() => { dispatch({ type: ActionTypes.CLEAR_ERROR }); }, 2000);
      }));
  };
}

export function fetchCompanyPositions(name) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/api/companies/${name}/positions`).then((res) => {
      dispatch({ type: ActionTypes.FETCH_COMPANY_POSITIONS, payload: res.data.response });
    })
      .catch(((error) => {
        dispatch({ type: 'ERROR', payload: { error: error.message } });
        setTimeout(() => { dispatch({ type: ActionTypes.CLEAR_ERROR }); }, 2000);
      }));
  };
}

export function fetchCompanyReviews(name) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/api/companies/${name}/reviews`).then((res) => {
      dispatch({ type: ActionTypes.FETCH_COMPANY_REVIEWS, payload: res.data.response });
      // console.log("HERE");
      // console.log(res.data.response)
    })
      .catch(((error) => {
        dispatch({ type: 'ERROR', payload: { error: error.message } });
        setTimeout(() => { dispatch({ type: ActionTypes.CLEAR_ERROR }); }, 2000);
      }));
  };
}

export function addCompany(fields, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/api/companies`, fields).then((res) => {
      history.push('/')
    })
      .catch(((error) => {
        dispatch({ type: 'ERROR', payload: { error: error.message } });
        setTimeout(() => { dispatch({ type: ActionTypes.CLEAR_ERROR }); }, 2000);
      }));
  };
}

// example function to get the current user
export function fetchUser(email) {
  return (dispatch) => {
    // console.log("here + email below")
    // console.log(email)
    axios.get(`${ROOT_URL}/api/users/${email}`).then((res) => {
      dispatch({ type: ActionTypes.FETCH_USER, payload: res.data.response[0] });
      // console.log("in axios, this is what is back from db");
      // console.log(res.data.response[0]);
      // console.log("***")
    })
      .catch(((error) => {
        dispatch({ type: 'ERROR', payload: { error: error.message } });
        setTimeout(() => { dispatch({ type: ActionTypes.CLEAR_ERROR }); }, 2000);
      }));
  };
}

export function editUser(fields, email) {
  return (dispatch)=> {
  //  console.log("in edit user");
    axios.patch(`${ROOT_URL}/api/users/${email}`, fields).then((res) => {
      // console.log("dispatching at edit user!")
      // console.log(res.data)
      dispatch({ type: ActionTypes.FETCH_USER, payload: fields });
      //console.log("in axios, this is what is back from db");
      //console.log(res.data.response[0]);
    //  console.log("***")
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

export function signinUser(user, history) {
  // console.log('at actions');
  return (dispatch) => {
    // console.log('AFTER DISPATCH');
    // console.log((`${ROOT_URL}/api/signin`));
    axios.put(`${ROOT_URL}/api/signin`, user).then((response) => {
      // const userInfo = { username: response.data.username, password: response.data.password };
      dispatch({ type: ActionTypes.AUTH_USER, email: user.email });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', user.email);

      // localStorage.setItem('username', response.data.username);
      history.push('/');
    }).catch((error) => {
    //   console.log('theres an error');
      dispatch({ type: ActionTypes.AUTH_USER, payload: error });
      // setTimeout(() => { dispatch({ type: ActionTypes.CLEAR_ERROR }); }, 2000);
    });
  };
}
export function signupUser(user, history) {
  // console.log(`${ROOT_URL}/api/signup`)
  // console.log("Tryina hithere")
  //
  // console.log('at SignupUser');
  // console.log(user);
  // console.log('persons info printed above');
  // takes in an object with email and password (minimal user object)

  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  return (dispatch) => {
    // does an axios.post on the /signup endpoint (only difference from above)
    //console.log("AFTER DISPLATCE")

    axios.post(`${ROOT_URL}/api/signup`, user).then((response) => {
      // on success does:
      //  dispatch({ type: ActionTypes.AUTH_USER });
      // console.log(response);
      // console.log('this is the response');
      dispatch({ type: ActionTypes.AUTH_USER, firstname: user.firstname, email: user.email});
      //  localStorage.setItem('token', response.data.token);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', user.email);
      localStorage.setItem('firstname', user.firstname);


      history.push('/');
    }).catch((error) => {
      // on error should dispatch(authError(`Sign Up Failed: ${error.response.data}`));
      dispatch(authError(`Sign Up Failed: ${error.response.data}`));
    });
  };
}

// deletes token from localstorage
// and deauths
export function signoutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('firstname');
    localStorage.removeItem('email');
    //console.log("sgning out")
    dispatch({ type: ActionTypes.DEAUTH_USER });
    history.push('/');
  };
}
