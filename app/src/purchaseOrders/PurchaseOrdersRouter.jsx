import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import PurchaseOrdersContainer from './components/PurchaseOrders';

export default function PurchaseOrdersRouter({ match }) {
  const { path } = match;

  return (
    <section>
      <Switch>
        <Route exact path={path} component={PurchaseOrdersContainer} />
        <Route
          exact
          path={`${path}/:id/remove`}
          component={(props) => (<PurchaseOrdersContainer isRemoveModalShown {...props} />)}
        />
      </Switch>
    </section>
  );
}

PurchaseOrdersRouter.propTypes = {
  match: PropTypes.object.isRequired,
};
