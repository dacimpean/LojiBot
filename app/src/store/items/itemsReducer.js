import { groupBy } from 'lodash';

import * as actionTypes from './itemsActionTypes';
import { createReducer } from '../../utils';

const initialState = {
  arePartsFetching: false,
  items: {},
};

export default createReducer(initialState, {
  [actionTypes.FETCH_ITEMS_REQUESTED]: (state) => ({
    ...state,
    arePartsFetching: true,
  }),
  [actionTypes.FETCH_ITEMS_SUCCEED]: (state, action) => ({
    ...state,
    items: groupBy(action.items, 'po'),
    arePartsFetching: false,
  }),
  [actionTypes.FETCH_ITEMS_FAILED]: (state) => ({
    ...state,
    arePartsFetching: false,
  }),
});
