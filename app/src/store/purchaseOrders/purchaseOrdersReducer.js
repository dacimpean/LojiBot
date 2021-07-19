import {
  groupBy, keyBy,
} from 'lodash';

import * as actionTypes from './purchaseOrdersActionTypes';
import { createReducer } from '../../utils';

const initialState = {
  purchaseOrders: {},
  vendors: {},
};

export default createReducer(initialState, {
  [actionTypes.FETCHING_PO_SUCCEED]: (state, action) => ({
    ...state,
    purchaseOrders: groupBy(action.purchaseOrders, 'status'),
  }),
  [actionTypes.FETCHING_VENDORS_SUCCEED]: (state, action) => ({
    ...state,
    vendors: keyBy(action.vendors, 'id'),
  }),
});
