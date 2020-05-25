import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const name = this.props.reviewInfo.Anonymous === 1 ? <p>Anonymous </p>
      : <p> {this.props.reviewInfo.FirstName} {this.props.reviewInfo.LastName} </p>;
    return (
      <div className="review-info">
        <p> name: </p>
        {name}
        <p> grad year: {this.props.reviewInfo.GradYear} </p>
        <p> major: {this.props.reviewInfo.Major} </p>
        <p> PositionTitle: {this.props.reviewInfo.PositionTitle} </p>
        <p> Comment: {this.props.reviewInfo.Comment} </p>
        <p> Rating: {this.props.reviewInfo.Rating} </p>
        <p> review date: {this.props.reviewInfo.ReviewDate} </p>
      </div>
    );
  }
}


export default withRouter(connect(null, { })(Review));
