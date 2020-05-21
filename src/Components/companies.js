/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Company extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <p> this is the {this.props.match.params.id} page </p>
      </div>
    );
  }
}

export default withRouter(connect(null)(Company));
