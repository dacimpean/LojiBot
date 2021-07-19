import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import AppRouterContainer from './AppRouter';

export default function App({ store }) {
  return (
    <Provider store={store}>
      <AppRouterContainer />
    </Provider>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired,
};
