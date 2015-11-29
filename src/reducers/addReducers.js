import {
  UPDATED
} from '../actions/addActions';
import {
  EDIT_EVENT
} from '../actions/uiActions';

const addState = {
  _id: '',
  title: '',
  content: '',
  priority: 1,
  start: new Date(),
  end: new Date(),
};

export function addData(state = addState, action) {
  switch(action.type) {
    case UPDATED:
      return Object.assign({}, state, addState);
    case EDIT_EVENT:
      return Object.assign({}, state, action.event); // better that date and time be the same as event
    default:
      return state;
  }
}
