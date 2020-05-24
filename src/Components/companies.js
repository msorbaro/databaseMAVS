/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './companies.scss';
import { fetchCompany, fetchCompanyPositions } from '../Actions';


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

  componentDidMount() {
    this.props.fetchCompany(this.props.match.params.id);
    this.props.fetchCompanyPositions(this.props.match.params.id)
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
          <p>positions previously offered</p>
          {positionJSX}
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

function mapStateToProps(state) {
  return { specificCompany: state.company.specificCompany,
  specificCompanyPositions: state.company.specificCompanyPositions };
}

export default withRouter(connect(mapStateToProps, {fetchCompany, fetchCompanyPositions})(Company));
