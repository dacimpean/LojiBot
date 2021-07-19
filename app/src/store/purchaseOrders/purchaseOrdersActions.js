import { createAction, request } from '../../utils';
import * as actionTypes from './purchaseOrdersActionTypes';

export const changeActiveFilter = createAction(actionTypes.CHANGE_ACTIVE_FILTER, 'activeFilter');

export const fetchPurchaseOrders = () => (dispatch, getState) => {
  const { auth } = getState();

  dispatch({ type: actionTypes.FETCH_PO_REQUESTED });
  return request('get', '/po/purchaseorders/', {}, auth.accessToken)
    .then(({ data }) => dispatch({ type: actionTypes.FETCH_PO_SUCCEED, purchaseOrders: data }))
    .catch(() => dispatch({ type: actionTypes.FETCH_PO_FAILED }));
};
