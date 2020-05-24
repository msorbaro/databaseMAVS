
import React from 'react';
import ReactDOM from 'react-dom';
// import './style.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import App from './app';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import HomePage from './Components/home';
import Profile from './Components/profile';
import SignIn from './Components/signin';
import SignUp from './Components/signup';
import Company from './Components/companies';
import reducers from './reducers';
import { ActionTypes } from './actions';
import Nav from './Components/navbar';

// const App = () => (<div className="test">All the REACT are belong to us!</div>);

// const Profile = (props) => {
//   return <div> All there is to know about me </div>;
// };
// const Welcome = (props) => {
//   return <div>Welcome</div>;
// };

// const Company = (props) => {
//   return <div> this is company: {props.match.params.id} </div>;
// };

const App = (props) => {
  return (
    <Router>
      <div>
        <Nav />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route exact path="/" component={HomePage} />
        <Route path="/profile" component={Profile} />
        <Route exact path="/company/:id" component={Company} />
      </div>
    </Router>
  );
};


const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
));

const token = localStorage.getItem('token');
const email = localStorage.getItem('email');
if (token) {
  store.dispatch({ type: ActionTypes.AUTH_USER, email });
}

// we now wrap App in a Provider
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main'),
);
