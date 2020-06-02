/*
This is our nav bar.
The state is authenticated if the user is logged in,and then they can see their profile etc
otherwise they can just have the options to sign in or out
*/
import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signoutUser } from '../Actions';
import logo from '../img/logo.png';
import './navbar.scss';

const Nav = (props) => {
  if (props.authenticated) {
    return (
      <nav className="navBar">
        <ul>
          <li className="navElement"><NavLink to="/"><img className="logoAnchor" src={logo} alt="BreadBoxlogo" /></NavLink></li>
          <li className="navElement"><NavLink to="/">Home</NavLink></li>
          <li className="navElement"><NavLink to="/explore">Explore</NavLink></li>
          <li className="navElement"><NavLink to="/profile">Profile</NavLink></li>
          <li id="sign-out-nav" className="navElement"><NavLink to="/signin" onClick={() => props.signoutUser(props.history)}>Sign Out</NavLink></li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className="navBar">
        <ul>
          <li className="navElement"><NavLink to="/"><img className="logoAnchor" src={logo} alt="BreadBoxlogo" /></NavLink></li>
          <li className="navElement"><NavLink to="/signin">Sign In</NavLink></li>
          <li className="navElement"><NavLink to="/signup">Sign Up </NavLink></li>
        </ul>
      </nav>
    );
  }
};


function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}


export default withRouter(connect(mapStateToProps, { signoutUser })(Nav));
