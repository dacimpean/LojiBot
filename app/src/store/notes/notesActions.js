import * as actionTypes from './notesActionTypes';
import { request } from '../../utils';

export const fetchNotes = (purchaseOrderId) => (dispatch, getStore) => {
  const { auth } = getStore();

  dispatch({ type: actionTypes.FETCH_NOTES_REQUESTED });
  return request('get', '/po/purchaseordernotes/', { filter_po: purchaseOrderId }, auth.accessToken)
    .then(({ data }) => dispatch({ type: actionTypes.FETCH_NOTES_SUCCEED, notes: data }))
    .catch(() => dispatch({ type: actionTypes.FETCH_NOTES_FAILED }));
};

export const addNote = (body) => (dispatch, getStore) => {
  const { auth } = getStore();

  dispatch({ type: actionTypes.ADD_NOTE_REQUESTED });
  return request(
    'post',
    '/po/purchaseordernotes/', { ...body },
    auth.accessToken
  )
    .then(({ data }) => dispatch({ type: actionTypes.ADD_NOTE_SUCCEED, note: data }))
    .catch(() => dispatch({ type: actionTypes.ADD_NOTE_FAILED }));
};
