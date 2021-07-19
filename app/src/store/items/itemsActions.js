import * as actionTypes from './itemsActionTypes';
import { request } from '../../utils';

export const fetchPOItems = (purchaseOrderId) => (dispatch, getState) => {
  const { auth } = getState();

  dispatch({ type: actionTypes.FETCH_ITEMS_REQUESTED });
  return request('get', '/po/purchaseorderitems/', { filter_po: purchaseOrderId }, auth.accessToken)
    .then(({ data }) => dispatch({ type: actionTypes.FETCH_ITEMS_SUCCEED, items: data }))
    .catch(() => dispatch({ type: actionTypes.FETCH_ITEMS_FAILED }));
};
