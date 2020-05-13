
import React from 'react';
import ReactDOM from 'react-dom';
// import './style.scss';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
// import App from './app';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import HomePage from './Components/home';
import Profile from './Components/profile';
import Company from './Components/companies';
import reducers from './reducers';


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

const Nav = (props) => {
  return (
    <nav>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/profile">Profile</NavLink></li>
        <li><NavLink to="/company/google">test company </NavLink></li>
      </ul>
    </nav>
  );
};

const App = (props) => {
  return (
    <Router>
      <div>
        <Nav />
        <Route exact path="/" component={HomePage} />
        <Route path="/profile" component={Profile} />
        <Route exact path="/company/:id" component={Company} />
      </div>
    </Router>
  );
};


const store = createStore(reducers, {}, compose(
  applyMiddleware(),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
));

// we now wrap App in a Provider
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main'),
);
