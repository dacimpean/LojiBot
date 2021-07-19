import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import * as actionTypes from './notesActionTypes';
import { fetchNotes, addNote } from './notesActions';
import request from '../../utils/request';

jest.mock('../../utils/request');

describe('Notes Actions', () => {
  const mockStore = configureMockStore([thunk]);
  const auth = { accessToken: 'access' };

  let mockedStore;
  beforeEach(() => {
    mockedStore = mockStore({ auth });
  });

  describe('fetchNotes', () => {
    it('should fetch notes and dispatch an action if call is resolved', (done) => {
      const notes = [{ id: 'noteId', note: 'New message ' }];
      const store = mockStore({ auth });
      const expectedActions = [{
        type: actionTypes.FETCH_NOTES_REQUESTED,
      }, {
        type: actionTypes.FETCH_NOTES_SUCCEED,
        notes,
      }];
      request.mockResolvedValue({ data: notes });
      store.dispatch(fetchNotes()).then(() => {
        expect(request).toHaveBeenCalledWith('get', '/po/purchaseordernotes/', {}, auth.accessToken);
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });

    it('should dispatch an action if the call is rejected', (done) => {
      const store = mockStore({ auth });
      const expectedActions = [{
        type: actionTypes.FETCH_NOTES_REQUESTED,
      }, {
        type: actionTypes.FETCH_NOTES_FAILED,
      }];
      request.mockRejectedValue({});
      store.dispatch(fetchNotes()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });
  });

  describe('addNote', () => {
    it('should add note and dispatch actions', (done) => {
      const payload = {
        message: 'Test Message',
        followupDate: new Date(),
        status: 'OA',
      };
      const expectedActions = [{
        type: actionTypes.ADD_NOTE_REQUESTED,
      }, {
        type: actionTypes.ADD_NOTE_SUCCEED,
        note: { id: 1, ...payload },
      }];
      request.mockResolvedValue({ data: { id: 1, ...payload } });
      mockedStore.dispatch(addNote(payload)).then(() => {
        expect(request).toHaveBeenCalledWith(
          'post',
          '/po/purchaseordernotes/',
          { ...payload },
          auth.accessToken
        );
        expect(mockedStore.getActions()).toEqual(expectedActions);
        done();
      });
    });

    it('should dispatch an action if add note failed', (done) => {
      const expectedActions = [{
        type: actionTypes.ADD_NOTE_REQUESTED,
      }, {
        type: actionTypes.ADD_NOTE_FAILED,
      }];
      request.mockRejectedValue({});
      mockedStore.dispatch(addNote({})).then(() => {
        expect(mockedStore.getActions()).toEqual(expectedActions);
        done();
      });
    });
  });
});
