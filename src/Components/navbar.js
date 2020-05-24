import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signoutUser } from '../Actions';
import logo from '../img/logo.png';

const Nav = (props) => {
  console.log(props.authenticated);
  console.log('^^ auth');
  if (props.authenticated) {
    return (
      <nav className="navBar">
        <ul>
          <li className="navElement"><NavLink to="/"><img className="logoAnchor" src={logo} alt="BreadBoxlogo" /></NavLink></li>
          <li className="navElement"><NavLink to="/">Home</NavLink></li>
          <li className="navElement"><NavLink to="/profile">Profile</NavLink></li>
          <li className="navElement"><NavLink to="/" onClick={() => props.signoutUser(props.history)}>Sign Out</NavLink></li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className="navBar">
        <ul>
          <li className="navElement"><NavLink to="/"><img className="logoAnchor" src={logo} alt="BreadBoxlogo" /></NavLink></li>
          <li className="navElement"><NavLink to="/">Home</NavLink></li>
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
