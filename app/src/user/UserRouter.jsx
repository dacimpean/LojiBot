import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import UserSettingsContainer from './components/UserSettings';

export default function UserRouter({ match }) {
  const { path } = match;

  return (
    <section>
      <Switch>
        <Route exact path={path} component={UserSettingsContainer} />
      </Switch>
    </section>
  );
}

UserRouter.propTypes = {
  match: PropTypes.object.isRequired,
};
