import { combineReducers } from 'redux';
import auth from './auth/authReducer';
import layout from './layout/layoutReducer';
import purchaseOrders from './purchaseOrders/purchaseOrdersReducer';

export const store = combineReducers({
  auth,
  layout,
  purchaseOrders,
});
