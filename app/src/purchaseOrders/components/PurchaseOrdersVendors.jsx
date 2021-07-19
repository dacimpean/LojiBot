import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import { values, map } from 'lodash';

export class PurchaseOrdersVendors extends PureComponent {
  render() {
    const { vendors } = this.props;

    return (
      <Table>
        <thead>
          <th>Name</th>
        </thead>
        <tbody>
          {map(values(vendors), ({ name }) => (
            <tr>
              <td>{name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

const mapStateToProps = (({ purchaseOrders }) => ({
  vendors: purchaseOrders.vendors,
}));

PurchaseOrdersVendors.propTypes = {
  vendors: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip: PropTypes.number,
  })).isRequired,
};

export default connect(mapStateToProps)(PurchaseOrdersVendors);
