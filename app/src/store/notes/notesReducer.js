import { groupBy, union } from 'lodash';

import { createReducer } from '../../utils';
import * as actionTypes from './notesActionTypes';

const initialState = {
  areNotesFetching: false,
  notes: {},
};

export default createReducer(initialState, {
  [actionTypes.FETCH_NOTES_REQUESTED]: (state) => ({
    ...state,
    areNotesFetching: true,
  }),
  [actionTypes.FETCH_NOTES_SUCCEED]: (state, action) => ({
    ...state,
    notes: groupBy(action.notes, 'po'),
    areNotesFetching: false,
  }),
  [actionTypes.FETCH_NOTES_FAILED]: (state) => ({
    ...state,
    areNotesFetching: false,
  }),
  [actionTypes.ADD_NOTE_SUCCEED]: (state, action) => {
    const { note } = action;
    let updatedNotes;
    if (!state.notes[note.po]) {
      updatedNotes = [note];
    } else {
      updatedNotes = union(state.notes[note.po], [note]);
    }

    return {
      ...state,
      notes: {
        ...state.notes,
        [note.po]: updatedNotes,
      },
    };
  },
});
