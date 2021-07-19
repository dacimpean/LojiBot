import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SubNavigationPurchaseOrders from './SubNavigationPurchaseOrders';

import * as subNavigationTypes from '../../store/layout/layoutSubNavigationTypes';
import SubNavigationPurchaseOrder from './SubNavigationPurchaseOrder';

export class SubNavigation extends PureComponent {
  get subNavigationByType() {
    const { subNavigationType } = this.props;

    switch (subNavigationType) {
    case subNavigationTypes.PURCHASE_ORDERS:
      return (<SubNavigationPurchaseOrders />);
    case subNavigationTypes.PURCHASE_ORDER:
      return (<SubNavigationPurchaseOrder />);
    default:
      return null;
    }
  }

  render() {
    return this.subNavigationByType;
  }
}

const mapStateToProps = ({ layout }) => ({
  subNavigationType: layout.subNavigationType,
});

SubNavigation.propTypes = {
  subNavigationType: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(SubNavigation);
