import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink as RouterLink } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { keys } from 'lodash';


import PurchaseOrdersTable from './PurchaseOrdersTable';
import * as purchaseOrdersActions from '../../store/purchaseOrders/purchaseOrdersActions';
import * as layoutActions from '../../store/layout/layoutActions';

export class PurchaseOrders extends Component {
  state = {
    arePurchaseOrdersFetched: false,
  };

  componentDidMount() {
    const { arePurchaseOrdersFetched } = this.state;
    const { fetchPurchaseOrders, updateTitle } = this.props;

    if (!arePurchaseOrdersFetched) {
      fetchPurchaseOrders()
        .then(() => {
          this.setState({ arePurchaseOrdersFetched: true });
        });
    }

    updateTitle('Purchase Orders');
  }

  get status() {
    const { location } = this.props;

    const params = new URLSearchParams(location.search);
    return params.get('status');
  }

  get navigation() {
    const { purchaseOrders, match } = this.props;

    return (
      <Nav tabs className="mb-2">
        <NavItem>
          <NavLink active={!this.status} tag="div">
            <RouterLink to={`${match.path}`}>
              All
            </RouterLink>
          </NavLink>
        </NavItem>
        {keys(purchaseOrders).map((status, index) => (
          <NavItem key={index}>
            <NavLink active={this.status === status} tag="div">
              <RouterLink to={`${match.path}?status=${status}`}>
                {status}
              </RouterLink>
            </NavLink>
          </NavItem>
        ))}
      </Nav>
    );
  }

  get removeModal() {
    const { isRemoveModalShown } = this.props;

    if (!isRemoveModalShown) {
      return null;
    }

    return null;
  }

  render() {
    const { purchaseOrders, vendors } = this.props;

    return (
      <Fragment>
        {this.navigation}
        {this.removeModal}
        <PurchaseOrdersTable
          vendors={vendors}
          purchaseOrders={purchaseOrders}
          activeStatus={this.status}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ purchaseOrders }) => ({
  purchaseOrders: purchaseOrders.purchaseOrders,
  vendors: purchaseOrders.vendors,
});
const mapActionsToProps = (dispatch) => ({
  fetchPurchaseOrders: () => dispatch(purchaseOrdersActions.fetchPurchaseOrders()),
  updateTitle: (title) => dispatch(layoutActions.updateTitle(title)),
});

export default connect(mapStateToProps, mapActionsToProps)(PurchaseOrders);

PurchaseOrders.propTypes = {
  vendors: PropTypes.object.isRequired,
  purchaseOrders: PropTypes.object.isRequired,
  fetchPurchaseOrders: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  isRemoveModalShown: PropTypes.bool,
};

PurchaseOrders.defaultProps = {
  isRemoveModalShown: false,
};
