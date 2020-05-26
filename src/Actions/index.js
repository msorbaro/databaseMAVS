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
  FETCH_ALL_REVIEWS: 'FETCH_ALL_REVIEWS',
  FETCH_ALL_RATINGS: 'FETCH_ALL_RATINGS',
  FETCH_USER_REVIEWS: 'FETCH_USER_REVIEWS',
  FETCH_ALL_POSITIONS: 'FETCH_ALL_POSITIONS',
  FETCH_ALL_INTERVIEW_DIFFICULTIES: 'FETCH_ALL_INTERVIEW_DIFFICULTIES',
  FETCH_ALL_LOCATIONS: 'FETCH_ALL_LOCATIONS',
};
// example function where we are getting companies
export function fetchCompanies() {
//  console.log("at least im here")
  return (dispatch) => {
  //  console.log( `${ROOT_URL}/api/companies`);
  //  console.log("myurl^")
    axios.get(`${ROOT_URL}/api/companies/`).then((response) => {
    //  console.log(response.data);
      // console.log("I GOT A RESPONSE!!!")
      // console.log(response.data.response)
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

export function fetchAllReviews() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/api/companies/reviews`).then((res) => {
      dispatch({ type: ActionTypes.FETCH_ALL_REVIEWS, payload: res.data.response });
      // console.log("HERE");
      // console.log(res.data.response)
    })
      .catch(((error) => {
        dispatch({ type: 'ERROR', payload: { error: error.message } });
        setTimeout(() => { dispatch({ type: ActionTypes.CLEAR_ERROR }); }, 2000);
      }));
  };
}

export function fetchAvRating() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/api/companies/reviews`).then((res) => {
      let totRatingMap = new Map();
      let totCountMap = new Map();
      for(var i = 0; i< res.data.response.length; i+=1){
        var company = res.data.response[i].CompanyName;
        if(totCountMap.has(company)){
          var currCount = totCountMap.get(company) +1;
          totCountMap.set(company, currCount);
          var currrating = totRatingMap.get(company) + res.data.response[i].Rating;
          totRatingMap.set(company, currrating);
        }
        else {
          totCountMap.set(company, 1);
          totRatingMap.set(company, res.data.response[i].Rating);
        }
      }

      let finalMap = new Map();
      for(let key of totRatingMap.keys()){
        let totRating = totRatingMap.get(key);
        let totCount = totCountMap.get(key);
        finalMap.set(key, Math.round(totRating/totCount));
      }
      // console.log("I did all the map crap");
      // console.log(finalMap)

      dispatch({ type: ActionTypes.FETCH_ALL_RATINGS, payload: finalMap });
      // console.log("HERE");
      // console.log(res.data.response)
    })
      .catch(((error) => {
        dispatch({ type: 'ERROR', payload: { error: error.message } });
        setTimeout(() => { dispatch({ type: ActionTypes.CLEAR_ERROR }); }, 2000);
      }));
  };
}

export function fetchAvInterviewDifficulty() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/api/companies/reviews`).then((res) => {
      let totRatingMap = new Map();
      let totCountMap = new Map();
      for(var i = 0; i< res.data.response.length; i+=1){
        var company = res.data.response[i].CompanyName;
        if(totCountMap.has(company)){
          var currCount = totCountMap.get(company) +1;
          totCountMap.set(company, currCount);
          // console.log(res.data.response[i]);
          var currrating = totRatingMap.get(company) + res.data.response[i].InterviewDifficulty;
          totRatingMap.set(company, currrating);
        }
        else {
          totCountMap.set(company, 1);
          totRatingMap.set(company, res.data.response[i].InterviewDifficulty);
        }
      }

      let finalMap = new Map();
      for(let key of totRatingMap.keys()){
        let totRating = totRatingMap.get(key);
        let totCount = totCountMap.get(key);
        // console.log(totRating);
        // console.log(totCount);
        // console.log(key);
        finalMap.set(key, Math.round(totRating/totCount));
      }
      // console.log("I did all the map crap");
      // console.log(finalMap)

      dispatch({ type: ActionTypes.FETCH_ALL_INTERVIEW_DIFFICULTIES, payload: finalMap });
      // console.log("HERE");
      // console.log(res.data.response)
    })
      .catch(((error) => {
        dispatch({ type: 'ERROR', payload: { error: error.message } });
        setTimeout(() => { dispatch({ type: ActionTypes.CLEAR_ERROR }); }, 2000);
      }));
  };
}

export function fetchAllPositions() {
  console.log("in all posisitons!*****************")
  return (dispatch) => {
    axios.get(`${ROOT_URL}/api/companies/reviews`).then((res) => {
      console.log("here in axios call")
      let returnMap = new Map();
      for(var i = 0; i< res.data.response.length; i+=1){
        var company = res.data.response[i].CompanyName;
        var position = res.data.response[i].PositionTitle;
        if(returnMap.has(company)){
          var currPositions = returnMap.get(company).add(position);
          returnMap.set(company, currPositions);
        }
        else {
          var newSet = new Set();
          newSet.add(position);
          returnMap.set(company, newSet);
        }
      }
      console.log("I did all the map crap");
      console.log(returnMap)

      dispatch({ type: ActionTypes.FETCH_ALL_POSITIONS, payload: returnMap });
      // console.log("HERE");
      // console.log(res.data.response)
    })
      .catch(((error) => {
        dispatch({ type: 'ERROR', payload: { error: error.message } });
        setTimeout(() => { dispatch({ type: ActionTypes.CLEAR_ERROR }); }, 2000);
      }));
  };
}

export function fetchAllLocations() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/api/companies/reviews`).then((res) => {
      let returnMap = new Map();
      for(var i = 0; i< res.data.response.length; i+=1){
        var company = res.data.response[i].CompanyName;
        var city = res.data.response[i].City;
        var state = res.data.response[i].State;
        // console.log(city);
        // console.log(state);
        // console.log(res.data.response[i])
        var position = city + ", " + state;
        if(returnMap.has(company)){
          var currPositions = returnMap.get(company).add(position);
          returnMap.set(company, currPositions);
        }
        else {
          var newSet = new Set();
          newSet.add(position);
          returnMap.set(company, newSet);
        }
      }
      dispatch({ type: ActionTypes.FETCH_ALL_LOCATIONS, payload: returnMap });
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


export function addReview(fields, history) {
   console.log(fields);
   console.log("made it here and these are my fields")
  return (dispatch) => {
    axios.post(`${ROOT_URL}/api/review`, fields).then((res) => {
      const url = '/company/' + fields.CompanyName;
    //  console.log(url)
      history.push(url)
    })
      .catch(((error) => {
        dispatch({ type: 'ERROR', payload: { error: error.message } });
        setTimeout(() => { dispatch({ type: ActionTypes.CLEAR_ERROR }); }, 2000);
      }));
  };
  //history.push('/')
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

export function deleteReview(id, history, whereToGo) {
  console.log("here in general")
  axios.delete(`${ROOT_URL}/api/reviews/${id}`).then((res) => {
    console.log("deleted")
    history.push('/')
  })
}

export function fetchUserReviews(email) {
  return (dispatch) => {
    // console.log("here + email below")
    // console.log(email)
    axios.get(`${ROOT_URL}/api/users/${email}/reviews`).then((res) => {
      dispatch({ type: ActionTypes.FETCH_USER_REVIEWS, payload: res.data.response });
      // console.log("getting user reviews");
      // console.log(res.data.response)
    })
      .catch(((error) => {
        dispatch({ type: 'ERROR', payload: { error: error.message } });
        setTimeout(() => { dispatch({ type: ActionTypes.CLEAR_ERROR }); }, 2000);
      }));
  };
}


export function editReview(id, fields, email, history, path) {
  // console.log("hello?")
  // console.log(id)
  //   console.log("in edit review");
    axios.patch(`${ROOT_URL}/api/reviews/${id}`, fields).then((response) => {
      // console.log(path);
      history.push(path);
    })
      .catch(((error) => {
      //  dispatch({ type: 'ERROR', payload: { error: error.message } });
      console.log("error")
      }));
}

export function editUser(fields, email, history) {
  return (dispatch)=> {
  //  console.log("in edit user");
    axios.patch(`${ROOT_URL}/api/users/${email}`, fields).then((res) => {
      // console.log("dispatching at edit user!")
       console.log(fields);
       console.log("edit fields ^")
       dispatch({ type: ActionTypes.FETCH_USER, payload: fields });
      //console.log("in axios, this is what is back from db");
      //console.log(res.data.response[0]);
    //  console.log("***")
      history.push("/profile")
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
   console.log('at index.js!!');
  return (dispatch) => {
    // console.log('AFTER DISPATCH');
    // console.log((`${ROOT_URL}/api/signin`));
    console.log("in sign in")
    axios.put(`${ROOT_URL}/api/signin`, user).then((response) => {
      // const userInfo = { username: response.data.username, password: response.data.password };
      console.log("response********")
      console.log(response.data.response)
      if(response.data.response){
        dispatch({ type: ActionTypes.AUTH_USER, email: user.email });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', user.email);

        // localStorage.setItem('username', response.data.username);
        history.push('/');
      }
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
