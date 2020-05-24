/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './companies.scss';

class Company extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.reviews = ["review1", "review2", "review3"];
  }

  // renderReviews = () => {
  //   if (len(this.reviews) == 0) {
  //     return (<div> No Reviews Yet! </div>);
  //   } else {
  //     return this.reviews.map((review) => {
  //       return (
  //
  //
  //     )
  //   }
  // }

  render() {
    return (
      <div className="content">
        <div className="left">

          <div className="title">
            {this.props.match.params.id}
          </div>
          <div className="subtitle">
            Size: insert, Field: insert
          </div>

          <div className="boxes">
            <div className="box">
              <div className="numbers">
                10
              </div>
              <div className="description">
                Said it was good
              </div>
            </div>
            <div className="box">
              <div className="numbers">
                -20
              </div>
              <div className="description">
                Said it was a hard interview process
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="subtitle">
            Reviews
          </div>
          <div className="reviews">
            <div className="review">
              {this.reviews[0]}
            </div>
            <div className="review">
              {this.reviews[1]}
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default withRouter(connect(null)(Company));
