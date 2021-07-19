import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink as RouterLink } from 'react-router-dom';
import {
  Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody,
} from 'reactstrap';
import { keys } from 'lodash';


import AddNoteContainer from './AddNote';
import PurchaseOrdersTable from './PurchaseOrdersTable';
import * as purchaseOrdersActions from '../../store/purchaseOrders/purchaseOrdersActions';
import * as layoutActions from '../../store/layout/layoutActions';
import * as vendorsActions from '../../store/vendors/vendorsActions';
import { PURCHASE_ORDERS } from '../../store/layout/layoutSubNavigationTypes';

export class PurchaseOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDataFetched: false,
    };

    this.closeAddNoteModal = this.closeAddNoteModal.bind(this);
  }

  componentDidMount() {
    const { isDataFetched } = this.state;
    const {
      fetchPurchaseOrders, updateTitle, changeSubNavigation, fetchVendors,
    } = this.props;

    if (!isDataFetched) {
      Promise.all([
        fetchPurchaseOrders(),
        fetchVendors(),
      ]).then(() => {
        this.setState({ isDataFetched: true });
      });
    }

    updateTitle('Purchase Orders');
    changeSubNavigation();
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
          <NavLink className="px-3 py-2" active={!this.status} tag="div">
            <RouterLink to={`${match.path}`}>
              All
            </RouterLink>
          </NavLink>
        </NavItem>
        {keys(purchaseOrders).map((status, index) => (
          <NavItem key={index}>
            <NavLink className="px-3 py-2" active={this.status === status} tag="div">
              <RouterLink to={`${match.path}?status=${status}`}>
                {status}
              </RouterLink>
            </NavLink>
          </NavItem>
        ))}
      </Nav>
    );
  }

  get actionModal() {
    const { location } = this.props;
    const params = new URLSearchParams(location.search);
    const action = params.get('action');
    const id = params.get('id');

    if (!id) {
      return null;
    }

    switch (action) {
    case 'add_note':
      return (
        <Modal isOpen toggle={this.closeAddNoteModal} centered size="lg">
          <ModalHeader className="py-2 px-3 mb-0">
            Add a note to Purchase Order #{id}
          </ModalHeader>
          <ModalBody className="pt-2 pb-3 px-3">
            <AddNoteContainer purchaseOrderId={id} onNoteAdded={this.closeAddNoteModal} />
          </ModalBody>
        </Modal>
      );
    default:
      return null;
    }
  }

  closeAddNoteModal() {
    const { history, match } = this.props;
    const activeStatus = this.status;

    history.push(`${match.path}?status=${activeStatus}`);
  }

  render() {
    const { isDataFetched } = this.state;
    const {
      purchaseOrders, vendors, purchaseOrderTableHeadOptions, changeFilter,
    } = this.props;

    return (
      <Fragment>
        {this.navigation}
        {this.actionModal}
        <PurchaseOrdersTable
          vendors={vendors}
          isPODataFetching={!isDataFetched}
          purchaseOrders={purchaseOrders}
          purchaseOrderTableHeadOptions={purchaseOrderTableHeadOptions}
          activeStatus={this.status}
          changeFilter={changeFilter}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ purchaseOrders, vendors }) => ({
  arePOFetching: purchaseOrders.arePOFetching,
  areVendorsFetching: vendors.areVendorsFetching,
  purchaseOrders: purchaseOrders.purchaseOrders,
  vendors: vendors.vendors,
  purchaseOrderTableHeadOptions: purchaseOrders.purchaseOrderTableHeadOptions,
});
const mapActionsToProps = (dispatch) => ({
  fetchPurchaseOrders: () => dispatch(purchaseOrdersActions.fetchPurchaseOrders()),
  fetchVendors: () => dispatch(vendorsActions.fetchVendors()),
  updateTitle: (title) => dispatch(layoutActions.updateTitle(title)),
  changeFilter: (filter) => dispatch(purchaseOrdersActions.changeActiveFilter(filter)),
  changeSubNavigation: () => dispatch(layoutActions.changeSubNavigation(PURCHASE_ORDERS)),
});

export default connect(mapStateToProps, mapActionsToProps)(PurchaseOrders);

PurchaseOrders.propTypes = {
  vendors: PropTypes.object.isRequired,
  purchaseOrders: PropTypes.object.isRequired,
  purchaseOrderTableHeadOptions: PropTypes.object.isRequired,
  fetchPurchaseOrders: PropTypes.func.isRequired,
  fetchVendors: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  changeSubNavigation: PropTypes.func.isRequired,
};
