import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './reviews.scss';

class ExploreCompany extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div>
        <p>name: {this.props.name}</p>
        <p>av rating:{this.props.rating}</p>
      </div>
    );
  }
}


export default withRouter(connect(null, { })(ExploreCompany));
