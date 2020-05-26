import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import './explore.scss';
import ReactStars from 'react-stars';

class ExploreCompany extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <Link to={`/company/${this.props.name}`}>
        <div className="explore-rating">
          <h2 className="explore-company-name">Company: {this.props.name}</h2>
          <ReactStars className="star-rating" edit={false} count={5} value={this.props.rating} half={false} size={24} color2="#86B6FF" />
        </div>
      </Link>

    );
  }
}


export default withRouter(connect(null, { })(ExploreCompany));
