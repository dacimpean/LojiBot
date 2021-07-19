import { map, uniq } from 'lodash';

import * as actionTypes from './purchaseOrdersActionTypes';
import { createAction } from '../../utils';
import * as purchaseOrdersService from '../../purchaseOrders/purchaseOrdersService';

const handleSuccessfulPOFetching = createAction(actionTypes.FETCHING_PO_SUCCEED, 'purchaseOrders');
const handleSuccessfulVendorsFetching = createAction(actionTypes.FETCHING_VENDORS_SUCCEED, 'vendors');

export const fetchPurchaseOrders = () => (dispatch, getState) => {
  const { auth } = getState();

  return purchaseOrdersService.fetchPurchaseOrders(auth.accessToken)
    .then(({ data }) => {
      dispatch(handleSuccessfulPOFetching(data));
      const vendorIds = uniq(map(data, 'vendor'));
      return Promise.all(vendorIds.map(
        (vendorId) => purchaseOrdersService.fetchVendor(vendorId, auth.accessToken)
      ));
    })
    .then((vendors) => {
      const allVendors = map(vendors, 'data');
      dispatch(handleSuccessfulVendorsFetching(allVendors));
    });
};
