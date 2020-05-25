import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactStars from 'react-stars';
import './reviews.scss';

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const name = this.props.reviewInfo.Anonymous === 1 ? 'Anonymous'
      : `${this.props.reviewInfo.FirstName} ${this.props.reviewInfo.LastName}`;
    return (
      <div className="review-info">
        <div className="review-top">
          <p className="top"> {name} </p>
          <p className="top"> grad year: {this.props.reviewInfo.GradYear} </p>
          <p className="top"> major: {this.props.reviewInfo.Major} </p>
          <p className="top"> PositionTitle: {this.props.reviewInfo.PositionTitle} </p>
        </div>
        <p className="review-body"> {this.props.reviewInfo.Comment} </p>
        <div className="review-bottom">
          <p className="bottom"> Rating: {this.props.reviewInfo.Rating} </p>
          <ReactStars count={5} value={this.props.reviewInfo.Rating} half={false} size={15} color2="#cc8b9b" />

          <p className="bottom"> review date: {this.props.reviewInfo.ReviewDate} </p>
        </div>
      </div>
    );
  }
}


export default withRouter(connect(null, { })(Review));
