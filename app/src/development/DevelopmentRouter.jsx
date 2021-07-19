import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import DevelopmentContainer from './components/Development';

export default function DevelopmentRouter({ match }) {
  const { path } = match;

  return (
    <section>
      <Switch>
        <Route exact path={path} component={DevelopmentContainer} />
      </Switch>
    </section>
  );
}

DevelopmentRouter.propTypes = {
  match: PropTypes.object.isRequired,
};
