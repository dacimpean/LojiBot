import React from 'react';
import PropTypes from 'prop-types';
import { camelCase } from 'lodash';

import PurchaseOrdersTableHeadColumn from './PurchaseOrdersTableHeadColumn';

export default function PurchaseOrdersTableHead({ purchaseOrderTableHeadOptions, changeFilter }) {
  return (
    <thead>
      <tr>
        {purchaseOrderTableHeadOptions.titles.map((title, index) => (
          <PurchaseOrdersTableHeadColumn
            key={index}
            title={title}
            activeFilter={purchaseOrderTableHeadOptions.activeFilter}
            changeFilter={changeFilter}
            {...purchaseOrderTableHeadOptions.columnOptions[camelCase(title)]}
          />
        ))}
        <th />
      </tr>
    </thead>
  );
}

PurchaseOrdersTableHead.propTypes = {
  changeFilter: PropTypes.func.isRequired,
  purchaseOrderTableHeadOptions: PropTypes.shape({
    titles: PropTypes.arrayOf(PropTypes.string),
    columnOptions: PropTypes.objectOf(PropTypes.shape({
      sortable: PropTypes.bool,
    })).isRequired,
    activeFilter: PurchaseOrdersTableHeadColumn.propTypes.activeFilter,
  }).isRequired,
};
