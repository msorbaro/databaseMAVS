/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './companies.scss';
import Review from './reviews';
import { fetchCompany, fetchCompanyPositions, fetchCompanyReviews } from '../Actions';


class Company extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.reviews = ["review1", "review2", "review3"];
  }

  componentDidMount() {
    this.props.fetchCompany(this.props.match.params.id);
    this.props.fetchCompanyPositions(this.props.match.params.id)
    this.props.fetchCompanyReviews(this.props.match.params.id);
  }

  render() {
    var positions = new Set();
    if(this.props.specificCompanyPositions != null){
      for (var item in this.props.specificCompanyPositions){
        positions.add(this.props.specificCompanyPositions[item].PositionTitle);
      }
    }

    console.log(Array.from(positions))
    var positionJSX = Array.from(positions).map((word)=> {
      return(
        <p>{word}</p>
      )
    })

    var reviews = this.props.reviews.length > 0 ? this.props.reviews.map((review)=>{
      console.log(review)
      return(<Review reviewInfo={review}/>)
    }) : null;

    console.log(this.props.reviews);

    return (
      <div className="content">
        <div className="left">

          <div className="title">
            {this.props.match.params.id}
          </div>
          <div className="subtitle">
            Size: {this.props.specificCompany.CompanySize}, Field: {this.props.specificCompany.CompanyField}
          </div>

          <div className="boxes">
            <div className="box" id="box1">
              <div className="numbers">
                10
              </div>
              <div className="description" id="box2">
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
          <p className="prev-positions">Positions Previously Offered</p>
          {positionJSX}
        </div>

        <div>
          <div className="subtitle">
            Reviews
          </div>
          <div className="reviews">
          {reviews}
          </div>

        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { specificCompany: state.company.specificCompany,
  specificCompanyPositions: state.company.specificCompanyPositions,
  reviews: state.company.reviews};
}

export default withRouter(connect(mapStateToProps, {fetchCompany, fetchCompanyPositions, fetchCompanyReviews})(Company));
