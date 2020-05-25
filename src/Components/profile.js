import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchUser, editUser, fetchUserReviews } from '../Actions';
import './profile.scss';
import Review from './reviews';


class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false, firstname: '', lastname: '', gradYear: '', major: '',
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

  save = () => {
    const fields = { email: this.props.user.email };
    if (this.state.firstname !== '') {
      fields.FirstName = this.state.firstname;
    }
    if (this.state.lastname !== '') {
      fields.LastName = this.state.lastname;
    }
    if (this.state.major !== '') {
      fields.major = this.state.major;
    }
    if (this.state.gradYear !== '') {
      fields.GradYear = this.state.gradYear;
    }
    this.props.editUser(fields, this.props.email);
    this.setState({ editMode: false });
  }


  render() {
    console.log(this.props.user.reviews);
    if (!this.state.editMode) {
      const reviews = this.props.user.reviews != null ? this.props.user.reviews.map((review) => {
      //  console.log(review)
        return (<Review reviewInfo={review} />);
      }) : null;
      return (
        <div className="profile-info">
          <h1 className="welcome"> Welcome to your profile, {this.props.user.firstname}! </h1>
          <h2> Name: {this.props.user.firstname} {this.props.user.lastname} </h2>
          <h2> Year of Graduation: {this.props.user.gradYear} </h2>
          <h2> Declared Major: {this.props.user.major} </h2>
          <h2> Contact Information: {this.props.user.email} </h2>
          <button className="edit" type="button" onClick={this.tryMe}> Edit Information</button>
          <p> Reviews </p>
          {reviews}
        </div>
      );
    } else {
      return (
        <div>
          <p> first name </p>
          <input className="login-text-box" onChange={this.firstnameChange} value={this.state.firstname === '' ? this.props.user.firstname : this.state.firstname} />
          <p> last name </p>
          <input className="login-text-box" onChange={this.lastnameChange} value={this.state.lastname === '' ? this.props.user.lastname : this.state.lastname} />
          <p> gradyear </p>
          <input className="login-text-box" type="number" onChange={this.gradYearChange} value={this.state.gradYear === '' ? this.props.user.gradYear : this.state.gradYear} />
          <p> major </p>
          <input className="login-text-box" onChange={this.majorChange} value={this.state.major === '' ? this.props.user.major : this.state.major} />
          <button type="button" onClick={this.save}> save </button>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return { user: state.user, email: state.auth.email };
}

export default withRouter(connect(mapStateToProps, { fetchUser, editUser, fetchUserReviews })(Profile));
