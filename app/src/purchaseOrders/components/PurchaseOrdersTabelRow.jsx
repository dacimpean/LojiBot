import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Popover, PopoverBody, Button } from 'reactstrap';

import { Icon } from '../../utils';

export class PurchaseOrdersTableRow extends Component {
  static stopEventPropagation(event) {
    event.stopPropagation();
  }

  constructor(props) {
    super(props);

    this.state = {
      isActionMenuOpen: false,
    };

    this.actionMenuRef = React.createRef();
    this.toggleActionMenu = this.toggleActionMenu.bind(this);
    this.navigateToPurchaseOrder = this.navigateToPurchaseOrder.bind(this);
    this.addNoteToPurchaseOrder = this.addNoteToPurchaseOrder.bind(this);
    this.editPurchaseOrder = this.editPurchaseOrder.bind(this);
    this.removePurchaseOrder = this.removePurchaseOrder.bind(this);
  }

  navigateToPurchaseOrder(event) {
    event.stopPropagation();
    const { history, id } = this.props;

    history.push(`/purchase-orders/${id}`);
  }

  handlePurchaseOrderAction(event, action) {
    event.stopPropagation();
    event.preventDefault();

    const {
      history, id, match, activeStatus,
    } = this.props;

    this.setState({ isActionMenuOpen: false }, () => {
      history.push(`${match.path}?action=${action}&id=${id}&status=${activeStatus}`);
    });
  }

  addNoteToPurchaseOrder(event) {
    this.handlePurchaseOrderAction(event, 'add_note');
  }

  editPurchaseOrder(event) {
    this.handlePurchaseOrderAction(event, 'edit');
  }

  removePurchaseOrder(event) {
    this.handlePurchaseOrderAction(event, 'remove');
  }

  toggleActionMenu(event) {
    event.stopPropagation();

    this.setState(({ isActionMenuOpen }) => ({ isActionMenuOpen: !isActionMenuOpen }));
  }

  render() {
    const { isActionMenuOpen } = this.state;
    const {
      status, time_created, time_modified, vendor,
      vendorName, ship_method, ship_date, due_date,
    } = this.props;

    return (
      <tr className="st-cursor-pointer" onClick={this.navigateToPurchaseOrder}>
        <td />
        <td>
          <Link
            to={`/vendors/${vendor}`}
            onClick={PurchaseOrdersTableRow.stopEventPropagation}
          >
            {vendorName}
          </Link>
        </td>
        <td>{status}</td>
        <td>{ship_method}</td>
        <td>{ship_date}</td>
        <td>{due_date}</td>
        <td>{new Date(time_created).toLocaleString()}</td>
        <td>{new Date(time_modified).toLocaleString()}</td>
        <td>
          <Button
            className="st-icon-btn border-0 shadow-none"
            innerRef={this.actionMenuRef}
            onClick={this.toggleActionMenu}
            color="light"
          >
            <Icon iconName="more-horizontal" />
          </Button>
          <Popover
            target={this.actionMenuRef}
            isOpen={isActionMenuOpen}
            toggle={this.toggleActionMenu}
            delay={{ show: 120, hide: 0 }}
            placement="left"
            hideArrow
          >
            <PopoverBody className="d-flex flex-column px-0 py-1">
              <a
                href="#"
                onClick={this.addNoteToPurchaseOrder}
                className="d-flex align-items-center justify-content-start
                py-2 px-3 text-decoration-none st-popover-menu__item"
              >
                <Icon className="mr-2" iconName="file-text" /> Add Note
              </a>
              <a
                href="#"
                onClick={this.editPurchaseOrder}
                className="d-flex align-items-center justify-content-start
                py-2 px-3 text-decoration-none st-popover-menu__item"
              >
                <Icon className="mr-2" iconName="edit" /> Edit
              </a>
              <a
                href="#"
                onClick={this.removePurchaseOrder}
                className="d-flex align-items-center justify-content-start
                py-2 px-3 text-decoration-none st-popover-menu__item text-danger"
              >
                <Icon className="mr-2" iconName="trash-2" /> Remove
              </a>
            </PopoverBody>
          </Popover>
        </td>
      </tr>
    );
  }
}

PurchaseOrdersTableRow.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  time_created: PropTypes.string.isRequired,
  time_modified: PropTypes.string.isRequired,
  vendor: PropTypes.number.isRequired,
  vendorName: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  activeStatus: PropTypes.string,
  ship_method: PropTypes.string,
  ship_date: PropTypes.string,
  due_date: PropTypes.string,
};

PurchaseOrdersTableRow.defaultProps = {
  activeStatus: '',
  ship_method: '',
  ship_date: '',
  due_date: '',
};

export default withRouter(PurchaseOrdersTableRow);
