/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import './companies.scss';
import Review from './reviews';
import {Bar, Doughnut} from 'react-chartjs-2';
import { fetchCompany, fetchCompanyPositions, fetchCompanyReviews, } from '../Actions';
import ReactStars from 'react-stars';


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
  //  console.log("here")
    this.props.fetchCompany(this.props.match.params.id);
    this.props.fetchCompanyPositions(this.props.match.params.id)
    this.props.fetchCompanyReviews(this.props.match.params.id);
  }

  calculateAverageRating = () => {
    var totalReviewScore = 0;
    for (var i = 0; i < this.props.reviews.length; i++) {
      totalReviewScore = totalReviewScore + this.props.reviews[i].Rating
    }
  //  console.log(totalReviewScore);
    return Math.round(totalReviewScore/this.props.reviews.length)
  }

  calculateAverageInterviewDifficulty = () => {
    var totalReviewScore = 0;
    for (var i = 0; i < this.props.reviews.length; i++) {
      totalReviewScore = totalReviewScore + this.props.reviews[i].InterviewDifficulty;
    }
  //  console.log(totalReviewScore);
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

  calculatleLocationNumPeople = () => {
    var scoresMap = new Map();
    for (var i =0; i< this.props.reviews.length; i++){
      var city = this.props.reviews[i].City;
      var state = this.props.reviews[i].State;
      var position = city + ", " + state;
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

    var locationLabels = [];
    var locationData = [];
    var locationMap = this.calculatleLocationNumPeople();
    for(let key of locationMap.keys()){
      locationLabels.push(key);
      locationData.push(locationMap.get(key))
    }

    var chartData = {
      labels: labels,
      datasets: [
        {
           label: "People Hired",
           backgroundColor: ['rgba(134, 182, 255, 0.5)','rgba(134, 182, 255, 0.5)','rgba(134, 182, 255, 0.5)'],
           data: data,
        }
      ],
    }

    var myBarChart = <Bar
          data={chartData}
          // width={10}
          // height={5}
          options={{
            title:{
              display:true,
              text:'Number of Dartmouth Students Hired Per Term',
              fontSize:15,
              fontColor: '#272C55',
              fontFamily: "'Avenit Next', sans-serif"
            },
            legend:{
              display:false,
              labels: {
                defaultFontColor: '#272C55',
              }
            },
            layout: {
              padding: {
                left: 0,
                right: 50,
                top: 20,
                bottom: 0
            }

            },
            scales: {
              xAxes: [{
                // barThickness: 40,  // number (pixels) or 'flex'
                // maxBarThickness: 8 // number (pixels)
            }],
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
                 backgroundColor: ['rgba(39, 44, 85, 1)', 'rgba(39, 44, 85, 0.9)','rgba(39, 44, 85, 0.8)','rgba(39, 44, 85, 0.7)','rgba(39, 44, 85, 0.6)','rgba(39, 44, 85, 0.5)','rgba(39, 44, 85, 0.4)','rgba(39, 44, 85, 0.3)','rgba(39, 44, 85, 0.2)','rgba(39, 44, 85, 0.1)'],
                 data: positionData,
              }
        ],
    }

    var positionBar = <Doughnut
          data={positionData}
          options={{
            title:{
              display:true,
              text:'Number of Dartmouth Students by Position',
              fontSize:15,
              fontColor: '#272C55',
              fontFamily: "'Avenit Next', sans-serif"
            },
            layout: {
              padding: {
                left: 0,
                right: 0,
                top: 20,
                bottom: 0
            }

            },
            legend:{
              display:false,
            },
          }}
        />

        var locationD = {
                labels: locationLabels,
                datasets: [
                  {
                     label: "People Hired",
                     backgroundColor: ['rgba(39, 44, 85, 1)', 'rgba(39, 44, 85, 0.9)','rgba(39, 44, 85, 0.8)','rgba(39, 44, 85, 0.7)','rgba(39, 44, 85, 0.6)','rgba(39, 44, 85, 0.5)','rgba(39, 44, 85, 0.4)','rgba(39, 44, 85, 0.3)','rgba(39, 44, 85, 0.2)','rgba(39, 44, 85, 0.1)'],
                     data: locationData,
                  }
            ],
        }

        var locationBar = <Doughnut
              data={locationD}
              options={{
                title:{
                  display:true,
                  text:'Number of Dartmouth Students by Position',
                  fontSize:15,
                  fontColor: '#272C55',
                  fontFamily: "'Avenit Next', sans-serif"
                },
                layout: {
                  padding: {
                    left: 0,
                    right: 0,
                    top: 20,
                    bottom: 0
                }

                },
                legend:{
                  display:false,
                },
              }}
            />



    var positions = new Set();
    if(this.props.specificCompanyPositions != null){
      for (var item in this.props.specificCompanyPositions){
        positions.add(this.props.specificCompanyPositions[item].PositionTitle);
      }
    }

    // var locations = new Set();
    // if(this.props.specific)

    //console.log(Array.from(positions))
    var positionJSX = Array.from(positions).map((word)=> {
      return(
        <p className="positions-tags">{word}</p>
      )
    })

    var locationJSX = locationLabels.map((word)=>{
      return(
        <p className="positions-tags">{word}</p>
      )
    })

    var reviews = this.props.reviews.length > 0 ? this.props.reviews.map((review)=>{
    //  console.log(review)
      return(<Review reviewInfo={review} refresh={this.refresh}/>)
    }) : null;

    //console.log(this.props.reviews);

    var avRating = this.props.reviews.length > 0 ? this.calculateAverageRating() : 0;
    var avInterviewDifficulry = this.props.reviews.length > 0 ? this.calculateAverageInterviewDifficulty(): 0;
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
                <ReactStars className="stars-avg-rating" edit={false} value={avRating} color2="#272C55" color1="#C4C4C4" size={30}/>
              </div>
              <div className="description" id="box2">
                Average Rating
              </div>
            </div>
            <div className="box">
              <div className="numbers">
                {avInterviewDifficulry} / 10
              </div>
              <div className="description">
                Difficulty Rating
              </div>
            </div>
          </div>
          {positionBar}
          {myBarChart}
          {locationBar}
          <p className="prev-positions">Positions Previously Offered</p>
          <div className="all-positions">
          {positionJSX}
          </div>
          <p className="prev-positions">Locations Previously Offered</p>
          <div className="all-positions">
          {locationJSX}
          </div>
        </div>

        <div>

          <div className="subtitle">
            Reviews
          </div>
          <Link to={`/addReview/${this.props.match.params.id}`} className="add-review-button">Add Review</Link>
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

export default withRouter(connect(mapStateToProps, { fetchCompany, fetchCompanyPositions, fetchCompanyReviews})(Company));
