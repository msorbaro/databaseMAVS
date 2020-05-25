import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Explore extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className="review-info">
        Explore page
      </div>
    );
  }
}


export default withRouter(connect(null, { })(Explore));
