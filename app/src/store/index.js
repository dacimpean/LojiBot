import { combineReducers } from 'redux';
import auth from './auth/authReducer';
import layout from './layout/layoutReducer';
import purchaseOrders from './purchaseOrders/purchaseOrdersReducer';
import vendors from './vendors/vendorsReducer';
import notes from './notes/notesReducer';
import items from './items/itemsReducer';
import user from './user/userReducer';

export const store = combineReducers({
  auth,
  layout,
  purchaseOrders,
  vendors,
  notes,
  items,
  user,
});
