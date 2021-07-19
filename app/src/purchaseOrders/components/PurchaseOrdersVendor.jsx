import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';

export class PurchaseOrdersVendor extends PureComponent {
  render() {
    const { vendors, match } = this.props;
    const { id } = match.params;

    return (
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{vendors[id].name}</td>
            <td>{vendors[id].city}</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

const mapStateToProps = ({ purchaseOrders }) => ({
  vendors: purchaseOrders.vendors,
});

PurchaseOrdersVendor.propTypes = {
  match: PropTypes.object.isRequired,
  vendors: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(PurchaseOrdersVendor);
