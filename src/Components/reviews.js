import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactStars from 'react-stars';
import './reviews.scss';
import { deleteReview } from '../Actions';


class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  delete = () => {
    const link = this.props.reviewInfo.CompanyName;
    this.props.deleteReview(this.props.reviewInfo.ReviewID, this.props.history, link);
  }

  edit= () => {
    console.log('no edit feature yet');
  }

  render() {
    const name = this.props.reviewInfo.Anonymous === 1 ? 'Anonymous'
      : `${this.props.reviewInfo.FirstName} ${this.props.reviewInfo.LastName}`;
    console.log(this.props.reviewInfo);

    // console.log(this.props.reviewInfo.Email);


    const buttons = this.props.reviewInfo.Email === this.props.email ? (
      <div>
        <button type="button" onClick={this.delete}> delete </button>
        <button type="button" onClick={this.edit}> edit </button>
      </div>
    ) : null;
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
        {buttons}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { email: state.auth.email };
}

export default withRouter(connect(mapStateToProps, { deleteReview })(Review));
