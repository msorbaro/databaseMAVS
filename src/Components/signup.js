/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { signupUser } from '../actions';
import './signup.scss';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      major: '',
      gradYear: '',

    };
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.firstnameChange = this.firstnameChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

    onEmailChange = (event) => {
      this.setState({ email: event.target.value });
    }

    onPasswordChange = (event) => {
      this.setState({ password: event.target.value });
    }

    firstnameChange = (event) => {
      this.setState({ firstName: event.target.value });
    }

    lastnameChange = (event) => {
      this.setState({ lastName: event.target.value });
    }

    gradYearChange = (event) => {
      this.setState({ gradYear: event.target.value });
    }

    majorChange = (event) => {
      this.setState({ major: event.target.value });
    }

    onSubmit = (event) => {
      console.log('got to onSubmit');
      const user = { email: this.state.email, password: this.state.password,
        firstname: this.state.firstName, lastname: this.state.lastName, major: this.state.major, gradYear: this.state.gradYear };
      console.log("user here?");
      console.log(user);
      this.props.signupUser(user, this.props.history);
    }


    render() {
      return (
        <div className="sign-up-page">
          <div className="signup-form">
            <p className ="sign-up-text">Sign Up:</p>
            <input className="login-text-box" onChange={this.onEmailChange} placeholder="Enter Email" />
            <input className="login-text-box" onChange={this.onPasswordChange} placeholder="Enter Password" />
            <input className="login-text-box" onChange={this.firstnameChange} placeholder="Enter Firstname" />
            <input className="login-text-box" onChange={this.lastnameChange} placeholder="Enter Last name" />
            <input className="login-text-box" type="number" onChange={this.gradYearChange} placeholder="Enter Grad Year" />
            <input className="login-text-box" onChange={this.majorChange} placeholder="Enter major" />


            <button className="login-button" type="submit" onClick={this.onSubmit}>Finish</button>
          </div>
          <p className="newToApp">Already Have an Account? <Link to="/signin" className="authlink">Sign In!</Link></p>
        </div>


      );
    }
}

export default withRouter(connect(null, { signupUser })(SignUp));
