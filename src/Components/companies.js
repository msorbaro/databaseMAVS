/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import './companies.scss';
import Review from './reviews';
import {Bar} from 'react-chartjs-2';
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

  refresh = () => {
    console.log("here")
    this.props.fetchCompany(this.props.match.params.id);
    this.props.fetchCompanyPositions(this.props.match.params.id)
    this.props.fetchCompanyReviews(this.props.match.params.id);
  }

  calculateAverageRating = () => {
    var totalReviewScore = 0;
    for (var i = 0; i < this.props.reviews.length; i++) {
      totalReviewScore = totalReviewScore + this.props.reviews[i].Rating
    }
    console.log(totalReviewScore);
    return Math.round(totalReviewScore/this.props.reviews.length)
  }

  calculateTermNumPeople = () => {
    var scoresMap = new Map();
    for (var i =0; i< this.props.reviews.length; i++){
      var term = this.props.reviews[i].Term;
      var year = this.props.reviews[i].Year;
      var label = term+year;

      var currTermCount = scoresMap.has(label) ? scoresMap.get(label) + 1 : 1;
      if(term!=null) {scoresMap.set(label, currTermCount);}
    }

    return scoresMap;
  }

  calculatePositionNumPeople = () => {
    var scoresMap = new Map();
    for (var i =0; i< this.props.reviews.length; i++){
      var position = this.props.reviews[i].PositionTitle;
      var currTermCount = scoresMap.has(position) ? scoresMap.get(position) + 1 : 1;
      if(position!=null) {scoresMap.set(position, currTermCount);}
    }
    return scoresMap;
  }

  render() {

    var dataMap = this.calculateTermNumPeople();

    var labels=[];
    var data=[];

    for(let key of dataMap.keys()){
      labels.push(key);
      data.push(dataMap.get(key))
    }

    var positionLabels = [];
    var positionData = [];
    var positionMap = this.calculatePositionNumPeople();
    for(let key of positionMap.keys()){
      positionLabels.push(key);
      positionData.push(positionMap.get(key))
    }

    var chartData = {
      labels: labels,
      datasets: [
        {
           label: "People Hired",
           backgroundColor: ["#3e95cd", "#3e95cd","#3e95cd","#3e95cd","#3e95cd"],
           data: data,
        }
      ],
    }

    var myBarChart = <Bar
          data={chartData}
          options={{
            title:{
              display:true,
              text:'People Hired Per Term',
              fontSize:20
            },
            legend:{
              display:false,
            },
            scales: {
                yAxes: [{
                    ticks: {
                        suggestedMin: 0,
                    }
                }]
            }
          }}
        />

    var positionData = {
            labels: positionLabels,
            datasets: [
              {
                 label: "People Hired",
                 backgroundColor: ["#3e95cd", "#3e95cd","#3e95cd","#3e95cd","#3e95cd"],
                 data: positionData,
              }
        ],
    }

    var positionBar = <Bar
          data={positionData}
          options={{
            title:{
              display:true,
              text:'People in Each Position',
              fontSize:20
            },
            legend:{
              display:false,
            },
            scales: {
                yAxes: [{
                    ticks: {
                        suggestedMin: 0,
                    }
                }]
            }
          }}
        />


    var positions = new Set();
    if(this.props.specificCompanyPositions != null){
      for (var item in this.props.specificCompanyPositions){
        positions.add(this.props.specificCompanyPositions[item].PositionTitle);
      }
    }

    //console.log(Array.from(positions))
    var positionJSX = Array.from(positions).map((word)=> {
      return(
        <p>{word}</p>
      )
    })

    var reviews = this.props.reviews.length > 0 ? this.props.reviews.map((review)=>{
    //  console.log(review)
      return(<Review reviewInfo={review} refresh={this.refresh}/>)
    }) : null;

    console.log(this.props.reviews);

    var avRating = this.props.reviews.length > 0 ? this.calculateAverageRating() : 0;

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
                {avRating}
              </div>
              <div className="description" id="box2">
                Average Rating
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
          {positionBar}
          {myBarChart}
          <p className="prev-positions">Positions Previously Offered</p>
          {positionJSX}
        </div>

        <div>
          <Link to={`/addReview/${this.props.match.params.id}`}>Add Review</Link>
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
