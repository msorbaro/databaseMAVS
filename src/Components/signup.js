/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { signupUser } from '../actions';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',

    };
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

    onEmailChange = (event) => {
      this.setState({ email: event.target.value });
    }

    onPasswordChange = (event) => {
      this.setState({ password: event.target.value });
    }

    onUsernameChange = (event) => {
      this.setState({ username: event.target.value });
    }

    onSubmit = (event) => {
      console.log('got to onSubmit');
      const user = { email: this.state.email, password: this.state.password, username: this.state.username };
      this.props.signupUser(user, this.props.history);
    }


    render() {
      return (
        <div className="sign-in-up-page">
          <div className="signin-form">
            <p>Sign Up:</p>
            <input className="login-text-box" onChange={this.onEmailChange} placeholder="Enter Email" />
            <input className="login-text-box" onChange={this.onPasswordChange} placeholder="Enter Password" />
            <input className="login-text-box" onChange={this.onUsernameChange} placeholder="Enter Username" />
            <button className="login-button" type="submit" onClick={this.onSubmit}>Finish</button>
          </div>
          <p className="newToApp">Already Have an Account? <Link to="/signin" className="authlink">Sign In!</Link></p>
        </div>


      );
    }
}

export default withRouter(connect(null, { signupUser })(SignUp));
