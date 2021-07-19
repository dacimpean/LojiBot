import { keyBy } from 'lodash';
import { createReducer } from '../../utils';
import * as actionTypes from './vendorActionTypes';

const initialState = {
  areVendorsFetching: false,
  vendors: {},
};

export default createReducer(initialState, {
  [actionTypes.FETCH_VENDORS_REQUESTED]: (state) => ({
    ...state,
    areVendorsFetching: true,
  }),
  [actionTypes.FETCH_VENDORS_SUCCEED]: (state, action) => ({
    ...state,
    areVendorsFetching: false,
    vendors: keyBy(action.vendors, 'id'),
  }),
  [actionTypes.FETCH_VENDORS_FAILED]: (state) => ({
    ...state,
    areVendorsFetching: false,
  }),
});
