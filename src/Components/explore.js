import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  fetchCompanies, fetchAllReviews, fetchAvRating, fetchAllPositions,
} from '../Actions';
import ExploreCompany from './exploreCompany';


class Explore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectValue: 'None',
    };
  }

  componentDidMount() {
    this.props.fetchCompanies();
    this.props.fetchAllReviews();
    this.props.fetchAvRating();
    this.props.fetchAllPositions();
  }

  // Company should have a rating
  makeStateMap = () => {
    // console.log('here');
    const bigMap = new Map();
    if (this.props.allCompanyRatings != null && this.props.allCompanies != null && this.props.allCompanyPositions != null) {
      for (let i = 0; i < this.props.allCompanies.length; i += 1) {
        const currComp = this.props.allCompanies[i];
        const company = currComp.CompanyName;
        const avRating = this.props.allCompanyRatings.has(company) ? this.props.allCompanyRatings.get(company) : 'N/a';
        const positions = this.props.allCompanyPositions.has(company) ? this.props.allCompanyPositions.get(company) : 'N/a';
        const compData = {
          avRating,
          positions,
        };
        bigMap.set(company, compData);
      }
    }
    return bigMap;
  }

  calcAllPositions = () => {
    let allPosList = null;
    //  console.log('HERE************');
    //    console.log(this.props.allCompanyPositions);
    if (this.props.allCompanyPositions != null) {
      allPosList = new Set();

      //  console.log('here');
      for (const key of this.props.allCompanyPositions.keys()) {
        const nextSet = this.props.allCompanyPositions.get(key);
        const array = Array.from(nextSet);
        for (let i = 0; i < array.length; i += 1) {
          allPosList.add(array[i]);
        }
      }
      allPosList.add('None');
      return Array.from(allPosList);
    }
    return allPosList;
  }

  handleChange = (event) => {
    this.setState({ selectValue: event.target.value });
  }

  render() {
  //  console.log(this.props.allCompanyPositions);
    // console.log('all company ratings');
    const bigMap = this.makeStateMap();

    const allPositions = this.calcAllPositions();

    const optionsForSelect = allPositions == null ? null
      : allPositions.map((position) => {
        return <option value={position}> {position} </option>;
      });

    const dropdown = (
      <select value={this.state.selectValue} onChange={this.handleChange}>
        {optionsForSelect}
      </select>
    );

    const tiles = Array.from(bigMap.keys()).map((key) => {
      const positionsHere = bigMap.get(key).positions;
      // console.log(positionsHere);
      if (this.state.selectValue === 'None') {
        return (
          <ExploreCompany name={key} rating={bigMap.get(key).avRating} />
        );
      } else if (positionsHere !== 'N/a' && positionsHere.has(this.state.selectValue)) {
        return (
          <ExploreCompany name={key} rating={bigMap.get(key).avRating} />
        );
      } else { return null; }
    });


    // console.log(this.state.compData);
    return (
      <div className="review-info">
        {dropdown}
        Explore page
        {tiles}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    allCompanyPositions: state.company.allCompanyPositions,
    allCompanies: state.company.allCompanies,
    allCompanyReviews: state.company.allCompanyReviews,
    allCompanyRatings: state.company.allCompanyRatings,
  };
}

export default withRouter(connect(mapStateToProps, {
  fetchAllPositions, fetchCompanies, fetchAllReviews, fetchAvRating,
})(Explore));
