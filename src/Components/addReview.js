/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {  addReview } from '../Actions';
import ReactStars from 'react-stars'
import './addReview.scss';


class AddReview extends Component {
  constructor(props) {
    super(props);

    this.state = {fieldsError: false, position: '', year: '', term: '', city: '', state: '', rating: '', comment: '', anonymous: '', diff: ''};
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
    this.setState({ rating: event});
  }

  commentChange = (event) => {
    this.setState({ comment: event.target.value });
  }

  anonymousChange = (event) => {
    this.setState({ anonymous: event.target.value });
  }
  diffChange = (event) => {
    this.setState({ diff: event.target.value });
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
      InterviewDifficulty: this.state.diff,
    }
  //  console.log(this.state.rating);
    if ((this.state.position === '' || this.state.term === '' || this.state.year === ''|| this.state.city === ''
      || this.state.state === ''|| this.state.rating === '' || this.state.comment === ''
      || this.state.anonymous === '' || this.state.diff === '') === false) {
        this.props.addReview(fields, this.props.history);
      } else {
        this.setState({fieldsError: true});
      }

  }

  yearDropdown = () => {
    return (
      <select value={this.state.year} onChange={this.yearChange}>
        <option value="20"> 2020 </option>
        <option value="19"> 2019 </option>
        <option value="18"> 2018 </option>
        <option value="17"> 2017 </option>
        <option value="16"> 2016 </option>
      </select>
    );
  }

  termDropdown = () => {
    return (
      <select value={this.state.term} onChange={this.termChange}>
        <option value="F"> Fall </option>
        <option value="W"> Winter </option>
        <option value="S"> Spring </option>
        <option value="X"> Summer </option>
      </select>
    );
  }

  anonDropdown = () => {
    return (
      <select value={this.state.anonymous} onChange={this.anonymousChange}>
        <option value="0"> No </option>
        <option value="1"> Yes </option>
      </select>
    );
  }

  render() {
    var error = this.state.fieldsError ? <p> PLEASE FILL ALL FIELDS </p> : null;
    return (
      <div>
        <h1 className= "add-a-review"> Add a review for {this.props.match.params.id}</h1>
        <div className="review-content">
          {error}
          <p className= "review-input-name"> Position Title: </p>
          <input className="review-text-box" onChange={this.positionChange} value={this.state.position} />
          <p className= "review-input-name"> Term: </p>
          <div> {this.termDropdown()} </div>
          <p className= "review-input-name"> Year: </p>
          <div> {this.yearDropdown()} </div>
          <p className= "review-input-name"> City: </p>
          <input className="review-text-box" onChange={this.cityChange} value={this.state.city} />
          <p className= "review-input-name"> State: </p>
          <input className="review-text-box" onChange={this.stateChange} value={this.state.state} />
          <p className= "review-input-name"> Interview Difficulty: </p>
          <input className="review-text-box" onChange={this.diffChange} value={this.state.diff} />

          <p className= "review-input-name"> Rating: </p>

          <ReactStars count={5} onChange={this.ratingChange} value={this.state.rating} half={false} size={24} color2="#86B6FF"></ReactStars>

          {/* <input className="review-text-box" type="number" onChange={this.ratingChange} value={this.state.rating} /> */}
          <p className= "review-input-name"> Comment: </p>
          <input className="review-text-box" onChange={this.commentChange} value={this.state.comment} />
          <p className= "review-input-name"> Would you like to be Anonymous?</p>
          <div> {this.anonDropdown()} </div>
          <button className="submit-review" type="button" onClick={this.submit}> Submit </button>
        </div>
      </div>
    );
  }

}



function mapStateToProps(state) {
  return { email: state.auth.email };
}


export default withRouter(connect(mapStateToProps, {addReview})(AddReview));
