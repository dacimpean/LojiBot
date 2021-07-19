import { groupBy } from 'lodash';

import * as actionTypes from './purchaseOrdersActionTypes';
import { createReducer } from '../../utils';

const initialState = {
  arePOFetching: false,
  purchaseOrders: {},
  purchaseOrderTableHeadOptions: {
    activeFilter: {
      title: 'Vendor',
      asc: true,
    },
    titles: [
      'Memo',
      'Vendor',
      'Status',
      'Ship Method',
      'Ship Date',
      'Due Date',
      'Created At',
      'Last Modified',
    ],
    columnOptions: {
      memo: {
        sortable: false,
      },
      vendor: {
        sortable: true,
      },
      status: {
        sortable: false,
      },
      shipMethod: {
        sortable: true,
      },
      shipDate: {
        sortable: true,
      },
      dueDate: {
        sortable: true,
      },
      createdAt: {
        sortable: true,
      },
      lastModified: {
        sortable: true,
      },
    },
  },
};

export default createReducer(initialState, {
  [actionTypes.FETCH_PO_REQUESTED]: (state) => ({
    ...state,
    arePOFetching: true,
  }),
  [actionTypes.FETCH_PO_SUCCEED]: (state, action) => ({
    ...state,
    purchaseOrders: groupBy(action.purchaseOrders, 'status'),
  }),
  [actionTypes.FETCH_PO_FAILED]: (state) => ({
    ...state,
    arePOFetching: false,
  }),
  [actionTypes.CHANGE_ACTIVE_FILTER]: (state, action) => ({
    ...state,
    purchaseOrderTableHeadOptions: {
      ...state.purchaseOrderTableHeadOptions,
      activeFilter: action.activeFilter,
    },
  }),
});
