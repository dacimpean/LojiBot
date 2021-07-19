import { request } from '../utils';

export const fetchPurchaseOrders = (accessToken) => request(
  'get', '/po/purchaseorders/', {}, accessToken
);

export const fetchVendor = (id, accessToken) => request(
  'get', `/po/vendors/${id}/`, {}, accessToken
);
