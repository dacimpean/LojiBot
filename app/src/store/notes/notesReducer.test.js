import notesReducer from './notesReducer';
import * as actionTypes from './notesActionTypes';

describe('Notes Reducer', () => {
  it('should update state if notes are fetching', () => {
    const action = { type: actionTypes.FETCH_NOTES_REQUESTED };
    const { areNotesFetching, notes } = notesReducer(undefined, action);
    expect(notes).toEqual({});
    expect(areNotesFetching).toBe(true);
  });

  it('should update notes and if fetch is resolved', () => {
    const notes = [{ id: 1, po: 'poId2', note: 'test' }];
    const action = { type: actionTypes.FETCH_NOTES_SUCCEED, notes };
    const state = notesReducer({ areNotesFetching: true }, action);
    expect(state.notes).toEqual({
      poId2: [notes[0]],
    });
    expect(state.areNotesFetching).toBe(false);
  });

  it('should update state if fetch is failed', () => {
    const action = { type: actionTypes.FETCH_NOTES_FAILED };
    const { areNotesFetching } = notesReducer({ areNotesFetching: true }, action);
    expect(areNotesFetching).toBe(false);
  });

  it('should update state after note creation', () => {
    const note = { id: 1, po: 2, message: 'test' };
    const action = { type: actionTypes.ADD_NOTE_SUCCEED, note };
    const { notes } = notesReducer({ notes: {} }, action);
    expect(notes).toEqual({
      2: [{ id: 1, po: 2, message: 'test' }],
    });
  });

  it('should add note to state after note creation', () => {
    const note = { id: 1, po: 2, message: 'test' };
    const notes = { 2: [{ id: 2, message: 'test 2', po: 2 }] };
    const action = { type: actionTypes.ADD_NOTE_SUCCEED, note };
    const state = notesReducer({ notes }, action);
    expect(state.notes).toEqual({
      2: [ ...notes[2], note ],
    });
  });
});
