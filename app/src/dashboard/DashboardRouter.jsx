import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import DashboardContainer from './components/Dashboard';

export default function DashboardRouter({ match }) {
  const { path } = match;

  return (
    <Switch>
      <Route exact path={path} component={DashboardContainer} />
    </Switch>
  );
}

DashboardRouter.propTypes = {
  match: PropTypes.object.isRequired,
};
