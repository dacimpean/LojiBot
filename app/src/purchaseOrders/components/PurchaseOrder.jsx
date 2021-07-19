import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { values, find, flatten } from 'lodash';
import { Link } from 'react-router-dom';
import {
  Spinner, Row, Col, Badge, Table, Button, Collapse,
} from 'reactstrap';

import AddNoteContainer from './AddNote';
import * as layoutActions from '../../store/layout/layoutActions';
import * as purchaseOrderActions from '../../store/purchaseOrders/purchaseOrdersActions';
import * as vendorsActions from '../../store/vendors/vendorsActions';
import * as notesActions from '../../store/notes/notesActions';
import * as itemsActions from '../../store/items/itemsActions';
import { PURCHASE_ORDER } from '../../store/layout/layoutSubNavigationTypes';
import { numberToPrice } from '../../utils/billing';
import { Icon } from '../../utils';

export class PurchaseOrder extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isDataFetched: false,
      isAddNoteComponentShown: false,
    };

    this.toggleAddNoteComponent = this.toggleAddNoteComponent.bind(this);
  }

  componentDidMount() {
    const {
      fetchPurchaseOrders, fetchVendors, updateTitle, match, changeSubNavigation, fetchNotes, fetchItems,
    } = this.props;

    updateTitle(`Purchase Order ${match.params.id}`);
    changeSubNavigation();
    Promise.all([
      fetchPurchaseOrders(),
      fetchVendors(),
      fetchItems(match.params.id),
      fetchNotes(match.params.id),
    ]).finally(() => {
      this.setState({ isDataFetched: true });
    });
  }

  get purchaseOrder() {
    const { match, purchaseOrders } = this.props;
    const { id } = match.params;

    const allPurchaseOrders = flatten(values(purchaseOrders));

    return find(allPurchaseOrders, { id: +id });
  }

  get vendor() {
    const { vendors } = this.props;
    const { vendor } = this.purchaseOrder;

    return vendors[vendor];
  }

  get poParts() {
    const { items } = this.props;
    const { id } = this.purchaseOrder;

    let totalPrice = 0;

    if (!items[id]) {
      return null;
    }

    return (
      <div className="p-2 rounded-top st-order-items__container mb-2">
        <Table className="st-table st-table--small mb-0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {items[id].map((item) => {
              const price = parseFloat(item.unit_price);
              const priceForUnits = price * item.qty;
              totalPrice += priceForUnits;

              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.desc}</td>
                  <td>{item.qty}</td>
                  <td>{numberToPrice(price)}</td>
                  <td>{numberToPrice(priceForUnits)}</td>
                </tr>
              );
            })}
            <tr>
              <td colSpan={3} />
              <td>
                <strong>TOTAL</strong>
              </td>
              <td>
                <strong>{numberToPrice(totalPrice)}</strong>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }

  get notes() {
    const { notes } = this.props;
    const { id } = this.purchaseOrder;

    if (!notes[id]) {
      return null;
    }

    return (
      <div className="p-2 rounded-top st-order-items__container mb-2">
        <Table className="st-table st-table--small mb-0">
          <thead>
            <tr>
              <th>Message</th>
              <th>Status</th>
              <th>Followup date</th>
            </tr>
          </thead>
          <tbody>
            {notes[id].map((note) => (
              <tr key={note.id}>
                <td>{note.note}</td>
                <td>{note.status}</td>
                <td />
              </tr>
            ))
            }
          </tbody>
        </Table>
      </div>
    );
  }

  toggleAddNoteComponent() {
    this.setState(({ isAddNoteComponentShown }) => ({ isAddNoteComponentShown: !isAddNoteComponentShown }));
  }

  render() {
    const { isDataFetched, isAddNoteComponentShown } = this.state;

    if (!isDataFetched) {
      return (
        <div className="d-flex flex-grow-1 align-items-center justify-content-center">
          <Spinner color="primary" />
        </div>
      );
    }

    return (
      <Fragment>
        <Row className="mb-2">
          <Col xs={12} md={6} lg={3}>
            <span className="text-secondary mr-2">Memo:</span>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Row>
              <Col xs={3}>
                <span className="text-secondary">Vendor:</span>
              </Col>
              <Col xs={9}>
                <Link to={`/vendors/${this.vendor.id}`}>{this.vendor.name}</Link>
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Row>
              <Col xs={3}>
                <span className="text-secondary">Status:</span>
              </Col>
              <Col xs={9}>
                <Badge color="info">{this.purchaseOrder.status}</Badge>
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <span className="text-secondary">Ship Method:</span>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <span className="text-secondary">Ship Date:</span>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <span className="text-secondary">Due Date:</span>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Row>
              <Col xs={3}>
                <span className="text-secondary">Created:</span>
              </Col>
              <Col xs={9}>
                {new Date(this.purchaseOrder.time_created).toLocaleString()}
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Row>
              <Col xs={3}>
                <span className="text-secondary">Updated:</span>
              </Col>
              <Col xs={9}>
                {new Date(this.purchaseOrder.time_modified).toLocaleString()}
              </Col>
            </Row>
          </Col>
        </Row>
        <h4>Purchase Order Items</h4>
        {this.poParts}

        <h4>Purchase Order Notes</h4>
        <div className="d-flex justify-content-end mb-2">
          <Button
            color="primary"
            size="sm"
            className="d-flex align-items-center transition-ease"
            onClick={this.toggleAddNoteComponent}
          >
            <Icon iconName="plus" className="mr-1" />
            <span>Add a note</span>
          </Button>
        </div>
        <Collapse
          isOpen={isAddNoteComponentShown}
        >
          <div className="pt-2 px-2 pb-3">
            <AddNoteContainer
              purchaseOrderId={`${this.purchaseOrder.id}`}
              onNoteAdded={this.toggleAddNoteComponent}
            />
          </div>
        </Collapse>
        {this.notes}
      </Fragment>
    );
  }
}

const mapStateToProps = ({
  purchaseOrders, vendors, items, notes,
}) => ({
  isPODataFetching: purchaseOrders.isPODataFetching,
  purchaseOrders: purchaseOrders.purchaseOrders,
  vendors: vendors.vendors,
  items: items.items,
  notes: notes.notes,
});
const mapActionsToProps = (dispatch) => ({
  updateTitle: (title) => dispatch(layoutActions.updateTitle(title)),
  changeSubNavigation: () => dispatch(layoutActions.changeSubNavigation(PURCHASE_ORDER)),
  fetchPurchaseOrders: () => dispatch(purchaseOrderActions.fetchPurchaseOrders()),
  fetchVendors: () => dispatch(vendorsActions.fetchVendors()),
  fetchNotes: (purchaseOrderId) => dispatch(notesActions.fetchNotes(purchaseOrderId)),
  fetchItems: (purchaseOrderId) => dispatch(itemsActions.fetchPOItems(purchaseOrderId)),
});

PurchaseOrder.propTypes = {
  match: PropTypes.object.isRequired,
  purchaseOrders: PropTypes.object.isRequired,
  vendors: PropTypes.object.isRequired,
  updateTitle: PropTypes.func.isRequired,
  fetchPurchaseOrders: PropTypes.func.isRequired,
  fetchVendors: PropTypes.func.isRequired,
  changeSubNavigation: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired,
  fetchItems: PropTypes.func.isRequired,
  notes: PropTypes.object.isRequired,
  fetchNotes: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(PurchaseOrder);
