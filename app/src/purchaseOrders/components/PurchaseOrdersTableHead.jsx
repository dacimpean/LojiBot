import React from 'react';

import PurchaseOrdersTableHeadColumn from './PurchaseOrdersTableHeadColumn';

export default function PurchaseOrdersTableHead() {
  const titles = [
    'Vendor', 'Status',
    'Ship Method', 'Ship Date', 'Due Date',
    'Created At', 'Last Modified',
  ];

  return (
    <thead>
      <tr>
        <th>Memo</th>
        {titles.map((title, index) => (
          <PurchaseOrdersTableHeadColumn key={index} title={title} />
        ))}
        <th />
      </tr>
    </thead>
  );
}
