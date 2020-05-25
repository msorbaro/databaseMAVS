import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchCompanies, fetchAllReviews, fetchAvRating } from '../Actions';
import ExploreCompany from './exploreCompany';


class Explore extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    this.props.fetchCompanies();
    this.props.fetchAllReviews();
    this.props.fetchAvRating();
  }

  // Company should have a rating
  makeStateMap = () => {
    // console.log('here');
    const bigMap = new Map();
    if (this.props.allCompanyRatings != null && this.props.allCompanies != null) {
      for (let i = 0; i < this.props.allCompanies.length; i += 1) {
        const currComp = this.props.allCompanies[i];
        const company = currComp.CompanyName;
        const avRating = this.props.allCompanyRatings.has(company) ? this.props.allCompanyRatings.get(company) : 'N/a';
        const compData = {
          avRating,
        };
        bigMap.set(company, compData);
      }
    }
    return bigMap;
  }

  render() {
    console.log(this.props.allCompanyRatings);
    console.log('all company ratings');
    const bigMap = this.makeStateMap();

    const tiles = Array.from(bigMap.keys()).map((key) => {
      return (
        <ExploreCompany name={key} rating={bigMap.get(key).avRating} />
      );
    });


    console.log(this.state.compData);
    return (
      <div className="review-info">
        Explore page
        {tiles}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { allCompanies: state.company.allCompanies, allCompanyReviews: state.company.allCompanyReviews, allCompanyRatings: state.company.allCompanyRatings };
}

export default withRouter(connect(mapStateToProps, { fetchCompanies, fetchAllReviews, fetchAvRating })(Explore));
