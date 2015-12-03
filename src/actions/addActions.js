import request from 'superagent';

export const ADD_PRIORITY = 'ADD_PRIORITY';
export const SAVE = 'SAVE';
export const SAVING = 'SAVING';
export const SAVED = 'SAVED';
export const UPDATED = 'UPDATED';
export const NOT_SAVED = 'NOT_SAVED';
const API_ENDPOINT = 'http://10.100.0.110:3000';

export function addPriorityAction(priority) {
  return {
    type: ADD_PRIORITY,
    priority,
  };
}

function _savingAction() {
  return {
    type: SAVING,
  };
}

function _savedAction(event) {
  return {
    type: SAVED,
    event,
  };
}

function _updatedAction(event) {
  return {
    type: UPDATED,
    event,
  };
}

function _notSavedAction() {
  return {
    type: NOT_SAVED,
  };
}

export function saveAction(data) {
  return dispatch => {
    dispatch(_savingAction());
    return request.post(API_ENDPOINT + '/event')
    .send(data)
    .end(function(err, res) {
      if(res && res.body.status !== 'error') {
        dispatch(_savedAction(res.body));
      } else if(err) {
        dispatch(_notSavedAction());
      }
    });
  };
}

export function updateAction(data) {
  return dispatch => {
    dispatch(_savingAction());
    return request.put(API_ENDPOINT + '/event/' + data._id)
    .send(data)
    .end(function(err, res) {
      if(res && res.body.status !== 'error') {
        dispatch(_updatedAction(data));
      } else if(err) {
        dispatch(_notSavedAction());
      }
    });
  };
}
