import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Table, Input, Form, FormGroup,
} from 'reactstrap';
import { isEmpty, values, map } from 'lodash';

import PurchaseOrdersTableHead from './PurchaseOrdersTableHead';
import PurchaseOrdersTableRow from './PurchaseOrdersTabelRow';
import { Icon } from '../../utils';

export default function PurchaseOrdersTable({ purchaseOrders, vendors, activeStatus }) {
  let purchaseOrdersTableRows;

  if (isEmpty(purchaseOrders) || isEmpty(vendors)) {
    // @TODO: add a placeholder
    purchaseOrdersTableRows = [];
  } else if (!activeStatus) {
    purchaseOrdersTableRows = map(values(purchaseOrders),
      (purchaseOrderList) => map(purchaseOrderList,
        ({ id, vendor, ...purchaseOrder }) => (
          <PurchaseOrdersTableRow
            key={id}
            id={id}
            vendor={vendor}
            vendorName={vendors[vendor].name}
            {...purchaseOrder}
          />
        )));
  } else {
    purchaseOrdersTableRows = purchaseOrders[activeStatus].map(({ id, vendor, ...purchaseOrder }) => (
      <PurchaseOrdersTableRow
        key={id}
        id={id}
        vendor={vendor}
        vendorName={vendors[vendor].name}
        {...purchaseOrder}
      />
    ));
  }

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
        <PurchaseOrdersTableHead />
        <tbody>
          {purchaseOrdersTableRows}
        </tbody>
      </Table>
    </Fragment>
  );
}

PurchaseOrdersTable.propTypes = {
  vendors: PropTypes.object.isRequired,
  purchaseOrders: PropTypes.object.isRequired,
  activeStatus: PropTypes.string,
};

PurchaseOrdersTable.defaultProps = {
  activeStatus: '',
};
