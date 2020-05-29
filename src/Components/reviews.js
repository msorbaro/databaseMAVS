import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactStars from 'react-stars';
import './reviews.scss';
import { deleteReview, editReview } from '../Actions';


class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      comment: '',
    };
  }

  delete = () => {
    const link = this.props.reviewInfo.CompanyName;
    this.props.deleteReview(this.props.reviewInfo.ReviewID, this.props.history, link);
  }

  edit= () => {
    this.setState({ editMode: true });
  }

  save = () => {
    const fields = {
      Comment: this.state.comment,
    };
    console.log(this.props.reviewInfo);
    const path = `${this.props.path}/${this.props.reviewInfo.CompanyName}`;
    console.log(path);
    editReview(this.props.reviewInfo.ReviewID, fields, this.props.email, this.props.history, path, this.props.reviewInfo.CompanyName);
    this.setState({ editMode: false });
  }

  commentChange = (event) => {
    this.setState({ comment: event.target.value });
  }

  showCompanyName = () => {
    if (this.props.path === '/profile') {
      return (
        <p> Company: {this.props.reviewInfo.CompanyName} </p>
      );
    } else {
      return (
        null
      );
    }
  }

  render() {
    const name = this.props.reviewInfo.Anonymous === 1 ? 'Anonymous'
      : `${this.props.reviewInfo.FirstName} ${this.props.reviewInfo.LastName}`;


    const buttons = this.props.reviewInfo.Email === this.props.email ? (
      <div>
        <button className="deleteReview" type="button" onClick={this.delete}> delete </button>
        <button className="editReview" type="button" onClick={this.edit}> edit </button>
      </div>
    ) : null;

    const date = new Date(this.props.reviewInfo.ReviewDate);
    const formatDate = date.toDateString();

    if (!this.state.editMode) {
      return (
        <div id="review-info">
          {this.showCompanyName()}
          <div className="review-top">
            <p className="top">{name} </p>
            <p className="top"> YOG: {this.props.reviewInfo.GradYear} </p>
            <p className="top"> Major: {this.props.reviewInfo.Major} </p>
            <p className="top"> Position: {this.props.reviewInfo.PositionTitle} </p>
          </div>
          <p className="review-body"> {this.props.reviewInfo.Comment} </p>
          <div className="review-bottom">
            <p className="bottom"> Rating: </p>
            <ReactStars edit={false} count={5} value={this.props.reviewInfo.Rating} half={false} size={15} color2="#86B6FF" />
            <p className="bottom"> Review Date: {formatDate} </p>
          </div>
          {buttons}

        </div>
      );
    } else {
      return (
        <div id="review-info">
          <div className="review-top">
            <p className="top">{name} </p>
            <p className="top"> YOG: {this.props.reviewInfo.GradYear} </p>
            <p className="top"> Major: {this.props.reviewInfo.Major} </p>
            <p className="top"> Position: {this.props.reviewInfo.PositionTitle} </p>
          </div>
          <input className="login-text-box" onChange={this.commentChange} value={this.state.comment === '' ? this.props.reviewInfo.Comment : this.state.comment} />
          <div className="review-bottom">
            <p className="bottom"> Rating: </p>
            <ReactStars edit={false} count={5} value={this.props.reviewInfo.Rating} half={false} size={15} color2="#86B6FF" />
            <p className="bottom"> review date: {formatDate} </p>
            <button onClick={this.save} type="button"> Save </button>
          </div>

        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return { email: state.auth.email };
}

export default withRouter(connect(mapStateToProps, { deleteReview, editReview })(Review));
