/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {  addReview } from '../Actions';


class AddReview extends Component {
  constructor(props) {
    super(props);

    this.state = {position: '', year: '', term: '', city: '', state: '', rating: '', comment: '', anonymous: ''};
  }



  positionChange = (event) => {
    this.setState({ position: event.target.value });
  }

  termChange = (event) => {
    this.setState({ term: event.target.value });
  }

  yearChange = (event) => {
    this.setState({ year: event.target.value });
  }

  cityChange = (event) => {
    this.setState({ city: event.target.value });
  }

  stateChange = (event) => {
    this.setState({ state: event.target.value });
  }

  ratingChange = (event) => {
    this.setState({ rating: event.target.value });
  }

  commentChange = (event) => {
    this.setState({ comment: event.target.value });
  }

  anonymousChange = (event) => {
    this.setState({ anonymous: event.target.value });
  }

  submit = () => {
    const fields = {
      CompanyName: this.props.match.params.id,
      Email: this.props.email,
      PositionTitle: this.state.position,
      Term: this.state.term,
      Year: this.state.year,
      City: this.state.city,
      State: this.state.state,
      Rating: this.state.rating,
      Comment: this.state.comment,
      Anonymous: this.state.anonymous,
    }
    this.props.addReview(fields, this.props.history);
  }

  render() {
    return (
      <div className="content" style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
        <p> add a company </p>
        <p> company name {this.props.match.params.id}</p>
        <p> position Title </p>
        <input className="login-text-box" onChange={this.positionChange} value={this.state.position} />
        <p> term </p>
        <input className="login-text-box" onChange={this.termChange} value={this.state.term} />
        <p> year </p>
        <input className="login-text-box" onChange={this.yearChange} value={this.state.year} />
        <p> city </p>
        <input className="login-text-box" onChange={this.cityChange} value={this.state.city} />
        <p> state </p>
        <input className="login-text-box" onChange={this.stateChange} value={this.state.state} />
        <p> rating </p>
        <input className="login-text-box" type="number" onChange={this.ratingChange} value={this.state.rating} />
        <p> comment </p>
        <input className="login-text-box" onChange={this.commentChange} value={this.state.comment} />
        <p> anonymous (this needs to be 1 or 0)</p>
        <input className="login-text-box" type="number" onChange={this.anonymousChange} value={this.state.anonymous} />

        <button type="button" onClick={this.submit}> submit </button>
      </div>
    );
  }

}



function mapStateToProps(state) {
  return { email: state.auth.email };
}


export default withRouter(connect(mapStateToProps, {addReview})(AddReview));
