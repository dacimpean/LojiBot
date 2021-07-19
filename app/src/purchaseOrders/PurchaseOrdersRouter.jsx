import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import PurchaseOrdersContainer from './components/PurchaseOrders';
import PurchaseOrderContainer from './components/PurchaseOrder';
import PurchaseOrdersVendorsContainer from './components/PurchaseOrdersVendors';
import PurchaseOrdersVendorContainer from './components/PurchaseOrdersVendor';


export default function PurchaseOrdersRouter({ match }) {
  const { path } = match;

  return (
    <section>
      <Switch>
        <Route exact path={path} component={PurchaseOrdersContainer} />
        <Route
          exact
          path={`${path}/:id`}
          component={PurchaseOrderContainer}
        />
        <Route
          exact
          path={`${path}/vendors`}
          component={PurchaseOrdersVendorsContainer}
        />
        <Route
          exact
          path={`${path}/vendors/:id`}
          component={PurchaseOrdersVendorContainer}
        />
      </Switch>
    </section>
  );
}

PurchaseOrdersRouter.propTypes = {
  match: PropTypes.object.isRequired,
};
