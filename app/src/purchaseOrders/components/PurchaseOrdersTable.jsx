import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import {
  Table, Input, Form, FormGroup, Spinner,
} from 'reactstrap';
import { values, map } from 'lodash';

import PurchaseOrdersTableHead from './PurchaseOrdersTableHead';
import PurchaseOrdersTableRowWithRouter from './PurchaseOrdersTabelRow';
import { Icon } from '../../utils';

export default class PurchaseOrdersTable extends Component {
  get purchaseOrdersTableRows() {
    const {
      purchaseOrders, vendors, activeStatus, isPODataFetching, purchaseOrderTableHeadOptions,
    } = this.props;

    if (isPODataFetching) {
      return (
        <tr>
          <td colSpan={purchaseOrderTableHeadOptions.titles.length + 1}>
            <div className="d-flex align-items-center justify-content-center py-2">
              <Spinner color="primary" />
            </div>
          </td>
        </tr>
      );
    }

    if (!activeStatus) {
      return map(values(purchaseOrders),
        (purchaseOrderList) => map(purchaseOrderList,
          ({ id, vendor, ...purchaseOrder }) => (
            <PurchaseOrdersTableRowWithRouter
              key={id}
              id={id}
              vendor={vendor}
              vendorName={vendors[vendor].name}
              {...purchaseOrder}
            />
          )));
    }

    return purchaseOrders[activeStatus].map(({ id, vendor, ...purchaseOrder }) => (
      <PurchaseOrdersTableRowWithRouter
        key={id}
        id={id}
        vendor={vendor}
        vendorName={vendors[vendor].name}
        activeStatus={activeStatus}
        {...purchaseOrder}
      />
    ));
  }

  render() {
    const { purchaseOrderTableHeadOptions, changeFilter } = this.props;

    return (
      <Fragment>
        <div className="d-flex justify-content-between mb-2">
          <div className="actions" />
          <Form inline>
            <FormGroup className="position-relative">
              <Input bsSize="sm" className="pl-4" />
              <Icon className="position-absolute ml-2" iconName="search" />
            </FormGroup>
          </Form>
        </div>
        <Table className="st-table" hover>
          <PurchaseOrdersTableHead
            changeFilter={changeFilter}
            purchaseOrderTableHeadOptions={purchaseOrderTableHeadOptions}
          />
          <tbody>
            {this.purchaseOrdersTableRows}
          </tbody>
        </Table>
      </Fragment>
    );
  }
}

PurchaseOrdersTable.propTypes = {
  ...PurchaseOrdersTableHead.propTypes,
  isPODataFetching: PropTypes.bool.isRequired,
  vendors: PropTypes.object.isRequired,
  purchaseOrders: PropTypes.object.isRequired,
  activeStatus: PropTypes.string,
};

PurchaseOrdersTable.defaultProps = {
  activeStatus: '',
};
