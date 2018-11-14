/*
 *
 * Todo actions
 *
 */

import { action } from 'utils/actionsHelper';
import {
  FETCH_TODOS,
  FETCH_TODO,
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_TODO,
} from './constants';

export const fetchTodosAction = {
  request: () => action(FETCH_TODOS.REQUEST),
  success: data => action(FETCH_TODOS.SUCCESS, { data }),
  failure: error => action(FETCH_TODOS.FAILURE, { error }),
  cancel: () => action(FETCH_TODOS.CANCEL),
};

export const fetchTodoAction = {
  request: id => action(FETCH_TODO.REQUEST, { id }),
  success: data => action(FETCH_TODO.SUCCESS, { data }),
  failure: error => action(FETCH_TODO.FAILURE, { error }),
  cancel: () => action(FETCH_TODO.CANCEL),
};

export const deleteTodoAction = {
  request: id => action(DELETE_TODO.REQUEST, { id }),
  success: id => action(DELETE_TODO.SUCCESS, { id }),
  failure: error => action(DELETE_TODO.FAILURE, { error }),
  cancel: () => action(DELETE_TODO.CANCEL),
};

export const createTodoAction = {
  request: (formId, data) => action(CREATE_TODO.REQUEST, { formId, data }),
  success: data => action(CREATE_TODO.SUCCESS, { data }),
  failure: error => action(CREATE_TODO.FAILURE, { error }),
  cancel: () => action(CREATE_TODO.CANCEL),
};

export const updateTodoAction = {
  request: (formId, data) => action(UPDATE_TODO.REQUEST, { formId, data }),
  success: data => action(UPDATE_TODO.SUCCESS, { data }),
  failure: error => action(UPDATE_TODO.FAILURE, { error }),
  cancel: () => action(UPDATE_TODO.CANCEL),
};
