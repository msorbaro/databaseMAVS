/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Redirect } from 'react-router-dom';

// Router Wrapper
const PrivateRoute = ({ component: ChildComponent, ...props }) => {
  return (
    <Route
      {...props}
      render={(routeProps) => (props.authenticated ? (
        <ChildComponent {...routeProps} />
      ) : (
        <Redirect to="/signin" />
      ))}
    />
  );
};

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default withRouter(connect(mapStateToProps, null)(PrivateRoute));
