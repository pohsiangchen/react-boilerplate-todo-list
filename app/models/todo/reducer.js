/*
 *
 * Todo reducer
 *
 */

import { fromJS } from 'immutable';
import get from 'lodash/get';
import {
  FETCH_TODOS,
  FETCH_TODO,
  DELETE_TODO,
  CREATE_TODO,
  UPDATE_TODO,
} from './constants';

const initialState = fromJS({
  fetchAll: { loading: false, error: false },
  fetch: { loading: false, error: false },
  delete: { loading: false, error: false },
  datas: false,
  data: false,
});

//
// Fetch all
//
function todosFetchRequest(state) {
  return state
    .setIn(['fetchAll', 'loading'], true)
    .setIn(['fetchAll', 'error'], false);
}
function todosFetchSuccess(state, action) {
  return state.setIn(['fetchAll', 'loading'], false).set('datas', action.data);
}
function todosFetchFailure(state, action) {
  return state
    .setIn(['fetchAll', 'loading'], false)
    .setIn(['fetchAll', 'error'], action.error);
}
function todosFetchCancel(state) {
  return state.setIn(['fetchAll', 'loading'], false);
}

//
// Fetch
//
function todoFetchRequest(state) {
  return state
    .setIn(['fetch', 'loading'], true)
    .setIn(['fetch', 'error'], false);
}
function todoFetchSuccess(state, action) {
  return state
    .setIn(['fetch', 'loading'], false)
    .set('data', action.data)
    .update('datas', todos => {
      const foundIndex = todos.findIndex(
        todo => get(todo, 'id') === action.data.id,
      );
      if (foundIndex > -1) return todos;
      return todos.push(action.data);
    });
}
function todoFetchFailure(state, action) {
  return state
    .setIn(['fetch', 'loading'], false)
    .setIn(['fetch', 'error'], action.error);
}
function todoFetchCancel(state) {
  return state.setIn(['fetch', 'loading'], false);
}

//
// Delete
//
function todoDeleteRequest(state) {
  return state
    .setIn(['delete', 'loading'], true)
    .setIn(['delete', 'error'], false);
}
function todoDeleteSuccess(state, action) {
  return state
    .setIn(['delete', 'loading'], false)
    .update('datas', todos =>
      todos.filter(todo => get(todo, 'id') !== action.id),
    );
}
function todoDeleteFailure(state, action) {
  return state
    .setIn(['delete', 'loading'], false)
    .setIn(['delete', 'error'], action.error);
}
function todoDeleteCancel(state) {
  return state.setIn(['delete', 'loading'], false);
}

//
// Create
//
function todoCreateSuccess(state, action) {
  return state.update('datas', list => {
    list.push(action.data);
    return list;
  });
}

//
// Update
//
function todoUpdateSuccess(state, action) {
  return state.update('datas', todos =>
    todos.map(todo => {
      if (get(todo, 'id') === action.data.id) return action.data;
      return todo;
    }),
  );
}

function todoFormReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TODOS.REQUEST:
      return todosFetchRequest(state);
    case FETCH_TODOS.SUCCESS:
      return todosFetchSuccess(state, action);
    case FETCH_TODOS.FAILURE:
      return todosFetchFailure(state, action);
    case FETCH_TODOS.CANCEL:
      return todosFetchCancel(state);
    case FETCH_TODO.REQUEST:
      return todoFetchRequest(state);
    case FETCH_TODO.SUCCESS:
      return todoFetchSuccess(state, action);
    case FETCH_TODO.FAILURE:
      return todoFetchFailure(state, action);
    case FETCH_TODO.CANCEL:
      return todoFetchCancel(state);
    case DELETE_TODO.REQUEST:
      return todoDeleteRequest(state);
    case DELETE_TODO.SUCCESS:
      return todoDeleteSuccess(state, action);
    case DELETE_TODO.FAILURE:
      return todoDeleteFailure(state, action);
    case DELETE_TODO.CANCEL:
      return todoDeleteCancel(state);
    case CREATE_TODO.SUCCESS:
      return todoCreateSuccess(state, action);
    case UPDATE_TODO.SUCCESS:
      return todoUpdateSuccess(state, action);
    default:
      return state;
  }
}

export default todoFormReducer;
