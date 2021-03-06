import request from 'superagent';

export const DAY_VIEW = 'DAY_VIEW';
export const MONTH_VIEW = 'MONTH_VIEW';
export const ALL_VIEW = 'ALL_VIEW';
export const OPEN_ADD_VIEW = 'OPEN_ADD_VIEW';
export const CLOSE_ADD_VIEW = 'CLOSE_ADD_VIEW';
export const CLOSE_EDIT_VIEW = 'CLOSE_EDIT_VIEW';
export const DAY_DATA_RECEIVE = 'DAY_DATA_RECEIVE';
export const MONTH_DATA_RECEIVE = 'MONTH_DATA_RECEIVE';
export const DATA_NOT_RECEIVE = 'DATA_NOT_RECEIVE';
export const EDIT_EVENT = 'EDIT_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';
export const SYNCED_TO_DB = 'SYNCED_TO_DB';
export const ALL_DATA_RECEIVE = 'ALL_DATA_RECEIVE';
const API_ENDPOINT = 'http://10.100.0.110:3000';

function _dayViewAction() {
  return {
    type: DAY_VIEW,
  };
}

function _dayDataReceiveAction(data) {
  return {
    type: DAY_DATA_RECEIVE,
    data,
  };
}

function _monthDataReceiveAction(data) {
  return {
    type: MONTH_DATA_RECEIVE,
    data,
  };
}

function _allDataReceiveAction(data) {
  return {
    type: ALL_DATA_RECEIVE,
    data,
  };
}

function _dataNotReceiveAction() {
  return {
    type: DATA_NOT_RECEIVE,
  };
}

function _monthViewAction() {
  return {
    type: MONTH_VIEW,
  };
}

function _allViewAction() {
  return {
    type: ALL_VIEW,
  };
}

export function openAddViewAction() {
  return {
    type: OPEN_ADD_VIEW,
  };
}

export function closeAddViewAction() {
  return {
    type: CLOSE_ADD_VIEW,
  };
}

export function closeEditViewAction() {
  return {
    type: CLOSE_EDIT_VIEW,
  };
}

export function dayViewAction() {
  return dispatch => {
    dispatch(_dayViewAction());
    return request.get(API_ENDPOINT + '/event/search/day')
    .end(function(err, res) {
      if(res && res.status !== 'error') {
        dispatch(_dayDataReceiveAction(res.body));
      } else if(err) {
        dispatch(_dataNotReceiveAction());
      }
    });
  };
}

export function monthViewAction() {
  return dispatch => {
    dispatch(_monthViewAction());
    return request.get(API_ENDPOINT + '/event/search/month')
    .end(function(err, res) {
      if(res && res.status !== 'error') {
        dispatch(_monthDataReceiveAction(res.body));
      } else if(err) {
        dispatch(_dataNotReceiveAction());
      }
    });
  };
}

export function allViewAction() {
  return dispatch => {
    dispatch(_allViewAction());
    return request.get(API_ENDPOINT + '/event')
    .end(function(err, res) {
      if(res && res.status !== 'error') {
        dispatch(_allDataReceiveAction(res.body));
      } else if(err) {
        dispatch(_dataNotReceiveAction());
      }
    });
  };
}

export function editEventAction(event) {
  return {
    type: EDIT_EVENT,
    event,
  };
}

function _deleteEventAction(id) {
  return {
    type: DELETE_EVENT,
    id,
  };
}

export function deleteEventAction(id) {
  return dispatch => {
    return request.del(API_ENDPOINT + '/event/' + id)
    .end(function(err, res) {
      if(res && res.status !== 'error') {
        dispatch(_deleteEventAction(id));
      } else if(err) {
        dispatch(_dataNotReceiveAction());
      }
    });
  };
}

export function syncToDbAction() {
  return dispatch => {
    return request.get(API_ENDPOINT + '/event/sync/google')
    .end((err, res) => {
      if(res && res.status !== 'error') {
        dispatch(dayViewAction());
      } else if(err) {
        dispatch(_dataNotReceiveAction());
      }
    });
  };
}
