import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchUser, editUser, fetchUserReviews } from '../Actions';
import './profile.scss';
import './reviews.scss';
import Review from './reviews';


class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false, firstname: null, lastname: null, gradYear: null, major: null, emptyError: false,
    };
  }

  componentDidMount() {
    this.props.fetchUser(this.props.email);
    this.props.fetchUserReviews(this.props.email);
  }

  tryMe = () => {
    // const fields = {
    //   major: 'CS',
    // };
    this.setState({ editMode: true });
  //  this.props.editUser(fields, this.props.email);
  }

  firstnameChange = (event) => {
    this.setState({ firstname: event.target.value });
  }

  lastnameChange = (event) => {
    this.setState({ lastname: event.target.value });
  }

  gradYearChange = (event) => {
    this.setState({ gradYear: event.target.value });
  }

  majorChange = (event) => {
    this.setState({ major: event.target.value });
  }

  save = (event) => {
    const fields = {};

    if (this.state.firstname !== null) {
      fields.FirstName = this.state.firstname;
    }
    if (this.state.lastname !== null) {
      fields.LastName = this.state.lastname;
    }
    if (this.state.major !== null) {
      fields.Major = this.state.major;
    }
    if (this.state.gradYear !== null) {
      fields.GradYear = this.state.gradYear;
    }
    if ((this.state.firstname === '' || this.state.lastname === '' || this.state.major === '' || this.state.gradYear === '') === false) {
      this.props.editUser(fields, this.props.email, this.props.history);
      this.setState({ editMode: false });
    } else {
      this.setState({ emptyError: true });
    }
  }

  yearDropdown = () => {
    return (
      <select id="profile-select" value={this.state.gradYear === null ? this.props.user.gradYear : this.state.gradYear} onChange={this.gradYearChange}>
        <option value="2020"> 2020 </option>
        <option value="2021"> 2021 </option>
        <option value="2022"> 2022 </option>
        <option value="2023"> 2023 </option>
      </select>
    );
  }

  render() {
    // console.log(this.props.user);
    // console.log('this is the user ^');
    const error = this.state.emptyError ? <p> Please fill out all fields </p> : null;
    if (!this.state.editMode) {
      const reviews = this.props.user.reviews != null ? this.props.user.reviews.map((review) => {
      //  console.log(review)
        return (<Review reviewInfo={review} path="/profile" />);
      }) : null;
      return (
        <div>
          <div className="profile-info">
            <h1 className="welcome"> Welcome to your profile, {this.props.user.firstname}! </h1>
            <h2> Name: {this.props.user.firstname} {this.props.user.lastname} </h2>
            <h2> Year of Graduation: {this.props.user.gradYear} </h2>
            <h2> Declared Major: {this.props.user.major} </h2>
            <h2> Contact Information: {this.props.email} </h2>
            <button className="edit" type="button" onClick={this.tryMe}> Edit Information</button>
            <h2> Reviews </h2>
            <div className="reviews">
              {reviews}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="profile-info">
          <h1 className="welcome"> Please edit your profile below: </h1>
          {error}
          <p> First Name </p>
          <input className="login-text-box" onChange={this.firstnameChange} value={this.state.firstname === null ? this.props.user.firstname : this.state.firstname} />
          <p> Last Name </p>
          <input className="login-text-box" onChange={this.lastnameChange} value={this.state.lastname === null ? this.props.user.lastname : this.state.lastname} />
          <p> Class Year </p>
          <div> {this.yearDropdown()} </div>
          <p> Major </p>
          <input className="login-text-box" onChange={this.majorChange} value={this.state.major === null ? this.props.user.major : this.state.major} />
          <div>
            <button type="button" className="edit" onClick={this.save}> Save </button>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return { user: state.user, email: state.auth.email };
}

export default withRouter(connect(mapStateToProps, { fetchUser, editUser, fetchUserReviews })(Profile));
