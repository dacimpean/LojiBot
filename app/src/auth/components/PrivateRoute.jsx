import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({
  component: Component, isAuthenticated, ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => (isAuthenticated
        ? <Component {...props} />
        : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location },
            }}
          />
        ))}
    />
  );
}

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};
