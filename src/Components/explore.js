import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  fetchCompanies, fetchAllReviews, fetchAvRating, fetchAllPositions, fetchAvInterviewDifficulty, fetchAllLocations,
} from '../Actions';
import ExploreCompany from './exploreCompany';
import './explore.scss';


class Explore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectValue: 'Filter By Position',
      selectLocationValue: 'Filter By Location',
      selectSortValue: 'Sort By None',
    };
  }

  componentDidMount() {
    this.props.fetchCompanies();
    this.props.fetchAllReviews();
    this.props.fetchAvRating();
    this.props.fetchAllPositions();
    this.props.fetchAvInterviewDifficulty();
    this.props.fetchAllLocations();
  }

  // Company should have a rating
  makeStateMap = () => {
    // console.log('here');
    const bigMap = new Map();
    if (this.props.allCompanyLocations != null
       && this.props.allCompanyInterviewDifficulty != null && this.props.allCompanyRatings != null && this.props.allCompanies != null && this.props.allCompanyPositions != null) {
      for (let i = 0; i < this.props.allCompanies.length; i += 1) {
        const currComp = this.props.allCompanies[i];
        const company = currComp.CompanyName;
        const avRating = this.props.allCompanyRatings.has(company) ? this.props.allCompanyRatings.get(company) : 'N/a';
        const positions = this.props.allCompanyPositions.has(company) ? this.props.allCompanyPositions.get(company) : 'N/a';
        const avInterviewDifficulty = this.props.allCompanyInterviewDifficulty.has(company) ? this.props.allCompanyInterviewDifficulty.get(company) : 'N/a';
        const locations = this.props.allCompanyLocations.has(company) ? this.props.allCompanyLocations.get(company) : 'N/a';
        const compData = {
          avRating,
          positions,
          avInterviewDifficulty,
          locations,
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
      allPosList.add('Filter By Position');
      return Array.from(allPosList);
    }
    return allPosList;
  }

  calcAllLocations = () => {
    let allPosList = null;
    if (this.props.allCompanyLocations != null) {
      allPosList = new Set();
      for (const key of this.props.allCompanyLocations.keys()) {
        const nextSet = this.props.allCompanyLocations.get(key);
        const array = Array.from(nextSet);
        for (let i = 0; i < array.length; i += 1) {
          allPosList.add(array[i]);
        }
      }
      allPosList.add('Filter By Location');
      return Array.from(allPosList);
    }
    return allPosList;
  }


  handleChange = (event) => {
    this.setState({ selectValue: event.target.value });
  }

  handleLocationChange = (event) => {
    this.setState({ selectLocationValue: event.target.value });
  }


    handleSortChange = (event) => {
      this.setState({ selectSortValue: event.target.value });
    }

    render() {
      //  console.log(this.props.allCompanyInterviewDifficulty);
    // console.log('all company ratings');

      //  console.log(this.props.allCompanyLocations);
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

      const allLocations = this.calcAllLocations();
      // console.log(allLocations);

      const optionsForLocationSelect = allLocations == null ? null
        : allLocations.map((location) => {
          return <option value={location}> {location} </option>;
        });
      const locationDropdown = (
        <select value={this.state.selectLocationValue} onChange={this.handleLocationChange}>
          {optionsForLocationSelect}
        </select>
      );

      const sortDropdown = (
        <select value={this.state.selectSortValue} onChange={this.handleSortChange}>
          <option value="Alphabetically"> Alphabetically </option>
          <option value="Interview Difficulty"> Interview Difficulty </option>
          <option value="Average Rating"> Average Rating </option>
          <option value="Sort By None"> Sort By None </option>
        </select>
      );

      //  console.log('attempting sorts:');
      const mapAlpha = new Map([...bigMap.entries()].sort());
      const mapAvRating = new Map([...bigMap.entries()].sort((a, b) => {
      //  console.log(a[1].avRating);
        if (a[1].avRating === 'N/a' && b[1].avRating === 'N/a') {
          return 0;
        }
        if (a[1].avRating === 'N/a' && b[1].avRating !== 'N/a') {
          return 1;
        }
        if (a[1].avRating !== 'N/a' && b[1].avRating === 'N/a') {
          return -1;
        }
        if (a[1].avRating < b[1].avRating) {
          return 1;
        }
        if (a[1].avRating > b[1].avRating) {
          return -1;
        }
        return 0;
      }));
      const mapAvInterviewDif = new Map([...bigMap.entries()].sort((a, b) => {
      //  console.log(a[1].avInterviewDifficulty);
        if (a[1].avInterviewDifficulty === 'N/a' && b[1].avInterviewDifficulty === 'N/a') {
          return 0;
        }
        if (a[1].avInterviewDifficulty === 'N/a' && b[1].avInterviewDifficulty !== 'N/a') {
          return 1;
        }
        if (a[1].avInterviewDifficulty !== 'N/a' && b[1].avInterviewDifficulty === 'N/a') {
          return -1;
        }
        if (a[1].avInterviewDifficulty < b[1].avInterviewDifficulty) {
          return 1;
        }
        if (a[1].avInterviewDifficulty > b[1].avInterviewDifficulty) {
          return -1;
        }
        return 0;
      }));
      // console.log(mapAvRating);
      // console.log(mapAlpha);
      // console.log(mapAvInterviewDif);
      let mapToUse = bigMap;
      if (this.state.selectSortValue === 'Alphabetically') {
        mapToUse = mapAlpha;
      }
      if (this.state.selectSortValue === 'Interview Difficulty') {
        mapToUse = mapAvInterviewDif;
      }
      if (this.state.selectSortValue === 'Average Rating') {
        mapToUse = mapAvRating;
      }

      const tiles = Array.from(mapToUse.keys()).map((key) => {
        const positionsHere = bigMap.get(key).positions;
        const locationHere = bigMap.get(key).locations;
        if (this.state.selectValue === 'Filter By Position' && this.state.selectLocationValue === 'Filter By Location') {
          return (
            <ExploreCompany name={key} rating={bigMap.get(key).avRating} interviewDi={bigMap.get(key).avInterviewDifficulty} />
          );
        } else if (this.state.selectLocationValue === 'Filter By Location' && positionsHere !== 'N/a' && positionsHere.has(this.state.selectValue)) {
          return (
            <ExploreCompany name={key} rating={bigMap.get(key).avRating} interviewDi={bigMap.get(key).avInterviewDifficulty} />
          );
        } else if (this.state.selectValue === 'Filter By Position' && locationHere !== 'N/a' && locationHere.has(this.state.selectLocationValue)) {
          return (
            <ExploreCompany name={key} rating={bigMap.get(key).avRating} interviewDi={bigMap.get(key).avInterviewDifficulty} />
          );
        } else if (locationHere !== 'N/a' && locationHere.has(this.state.selectLocationValue) && positionsHere !== 'N/a' && positionsHere.has(this.state.selectValue)) {
          return (
            <ExploreCompany name={key} rating={bigMap.get(key).avRating} interviewDi={bigMap.get(key).avInterviewDifficulty} />
          );
        } else { return null; }
      });


      // console.log(this.state.compData);
      return (
        <div className="review-info">
          {dropdown}
          {locationDropdown}
          {sortDropdown}
          <h1 className="explore-header">Explore Dartmouth&apos;s Favorite Employers</h1>
          <div className="explore-blocks">{tiles}</div>
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
    allCompanyInterviewDifficulty: state.company.allCompanyInterviewDifficulty,
    allCompanyLocations: state.company.allCompanyLocations,
  };
}

export default withRouter(connect(mapStateToProps, {
  fetchAllPositions, fetchCompanies, fetchAllReviews, fetchAvRating, fetchAvInterviewDifficulty, fetchAllLocations,
})(Explore));
