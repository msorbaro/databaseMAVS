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

    this.state = {position: '', year: '', term: '', city: '', state: '', rating: '', comment: '', anonymous: '', diff: ''};
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
    this.props.addReview(fields, this.props.history);
  }

  render() {
    return (
      <div>
        <h1 className= "add-a-review"> Add a review for {this.props.match.params.id}</h1>
        <div className="review-content">
          <p className= "review-input-name"> Position Title: </p>
          <input className="review-text-box" onChange={this.positionChange} value={this.state.position} />
          <p className= "review-input-name"> Term: </p>
          <input className="review-text-box" onChange={this.termChange} value={this.state.term} />
          <p className= "review-input-name"> Year: </p>
          <input className="review-text-box" onChange={this.yearChange} value={this.state.year} />
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
          <p className= "review-input-name"> Would you like to be Anonymous? (1 = Yes and 0 = No)</p>
          <input className="review-text-box" type="number" onChange={this.anonymousChange} value={this.state.anonymous} />
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
