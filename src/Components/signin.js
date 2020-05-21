/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { signinUser } from '../actions';
import graphic from '../img/graphic.png';
import './signin.scss';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',

    };
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  onSubmit = (event) => {
    console.log('at signin.js function');
    console.log(this.state.email);
    console.log(this.state.password);
    console.log('credentials above');
    const user = { email: this.state.email, password: this.state.password };
    console.log(user);
    console.log('user above');
    console.log(this.props.history);
    console.log('history above');
    this.props.signinUser(this.state, this.props.history);
    // this.props.signinUser(user, this.props.history);
  }


  render() {
    return (
      <div className="sign-in-up-page">
        <div className="content">
          <div className="left-inputs">
            <img className="graphic" src={graphic} alt="Graphic" />
            <h1 important="loginH1">Bread Box</h1>
            <h2 className="loginText">Recommendations and reviews of jobs from our Dartmouth community.</h2>
          </div>

          {/* <div className="right-div"> */}
          <div className="right-inputs">
            <p className="sign-in-text">Sign in with your email:</p>
            <div className="text-boxes">
              <input className="login-text-box" onChange={this.onEmailChange} placeholder="Enter Email" />
              <div />
              <input className="login-text-box" onChange={this.onPasswordChange} placeholder="Enter Password" />

            </div>
            <button className="login-button" type="submit" onClick={this.onSubmit}>Login</button>
            <p className="newToApp">New to Our App? <Link to="/signup" className="authlink">Sign Up!</Link></p>
          </div>

          {/* </div> */}


        </div>

      </div>


    );
  }
}

export default withRouter(connect(null, { signinUser })(SignIn));
