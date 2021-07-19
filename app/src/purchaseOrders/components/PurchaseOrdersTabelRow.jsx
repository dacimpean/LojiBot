import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon, SimpleTooltip } from '../../utils';

export default function PurchaseOrdersTableRow({
  id, status, time_created, time_modified, vendor, vendorName, ship_method, ship_date, due_date,
}) {
  return (
    <tr>
      <td />
      <td>
        <Link to={`/vendors/${vendor}`}>
          {vendorName}
        </Link>
      </td>
      <td>{status}</td>
      <td>{ship_method}</td>
      <td>{ship_date}</td>
      <td>{due_date}</td>
      <td>{time_created}</td>
      <td>{time_modified}</td>
      <td>
        <Link
          id={`edit${id}`}
          to={`/purchase-orders/${id}/edit`}
          className="btn btn-sm bg-transparent border-0 shadow-none rounded-circle mr-2"
        >
          <Icon iconName="edit" />
        </Link>
        <SimpleTooltip target={`edit${id}`} placement="top" trigger="hover">
          Edit
        </SimpleTooltip>
        <Link
          id={`remove${id}`}
          to={`/purchase-orders/${id}/remove`}
          className="btn bg-transparent border-0 shadow-none rounded-circle"
        >
          <Icon iconName="trash-2" />
        </Link>
        <SimpleTooltip target={`remove${id}`} placement="top" trigger="hover">
          Remove
        </SimpleTooltip>
      </td>
    </tr>
  );
}

PurchaseOrdersTableRow.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  time_created: PropTypes.string.isRequired,
  time_modified: PropTypes.string.isRequired,
  vendor: PropTypes.number.isRequired,
  vendorName: PropTypes.string.isRequired,
  ship_method: PropTypes.string,
  ship_date: PropTypes.string,
  due_date: PropTypes.string,
};

PurchaseOrdersTableRow.defaultProps = {
  ship_method: '',
  ship_date: '',
  due_date: '',
};
