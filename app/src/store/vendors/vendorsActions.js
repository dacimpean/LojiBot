import * as actionTypes from './vendorActionTypes';
import { request } from '../../utils';

export const fetchVendors = () => (dispatch, getState) => {
  const { auth } = getState();

  dispatch({ type: actionTypes.FETCH_VENDORS_REQUESTED });
  return request('get', '/po/vendors/', {}, auth.accessToken)
    .then(({ data }) => dispatch({ type: actionTypes.FETCH_VENDORS_SUCCEED, vendors: data }))
    .catch(() => dispatch({ type: actionTypes.FETCH_VENDORS_FAILED }));
};
