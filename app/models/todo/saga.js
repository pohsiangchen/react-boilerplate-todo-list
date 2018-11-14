import {
  call,
  put,
  race,
  take,
  fork,
  cancelled,
  takeLatest,
} from 'redux-saga/effects';
import { startSubmit, stopSubmit, reset } from 'redux-form/es/immutable';
import get from 'lodash/get';
import { toNativeJS } from 'utils/common';

import {
  fetchTodos as apiFetchTodos,
  fetchTodo as apiFetchTodo,
  createTodo as apiCreateTodo,
  updateTodo as apiUpdateTodo,
  deleteTodo as apiDeleteTodo,
} from 'services/todo.api';

import {
  FETCH_TODOS,
  FETCH_TODO,
  DELETE_TODO,
  CREATE_TODO,
  UPDATE_TODO,
} from './constants';
import {
  fetchTodosAction,
  fetchTodoAction,
  deleteTodoAction,
  createTodoAction,
  updateTodoAction,
} from './actions';

export function* fetchTodos() {
  try {
    const {
      data: { data },
    } = yield call(apiFetchTodos);
    yield put(fetchTodosAction.success(data));
  } catch (error) {
    const errorMessage = yield call(
      get,
      error,
      'response.data.message',
      error.message,
    );
    yield put(fetchTodosAction.failure(errorMessage));
  } finally {
    if (yield cancelled()) {
      // cancelled...
    }
  }
}

export function* fetchTodo({ id }) {
  try {
    const { data } = yield call(apiFetchTodo, id);
    yield put(fetchTodoAction.success(data));
  } catch (error) {
    const errorMessage = yield call(
      get,
      error,
      'response.data.message',
      error.message,
    );
    yield put(fetchTodoAction.failure(errorMessage));
  } finally {
    if (yield cancelled()) {
      // cancelled...
    }
  }
}

export function* updateTodo(formId, data) {
  yield put(startSubmit(formId));
  try {
    const { data: resData } = yield call(
      apiUpdateTodo,
      get(data, 'id'),
      toNativeJS(data),
    );
    yield put(updateTodoAction.success(resData));
    yield put(stopSubmit(formId));
    yield put(reset(formId));
  } catch (error) {
    const errorMessage = yield call(
      get,
      error,
      'response.data.message',
      error.message,
    );
    yield put(stopSubmit(formId, { _error: errorMessage }));
  } finally {
    if (yield cancelled()) {
      yield put(stopSubmit(formId));
    }
  }
}

export function* createTodo(formId, data) {
  yield put(startSubmit(formId));
  try {
    const { data: resData } = yield call(apiCreateTodo, toNativeJS(data));
    yield put(createTodoAction.success(resData));
    yield put(stopSubmit(formId));
    yield put(reset(formId));
  } catch (error) {
    const errorMessage = yield call(
      get,
      error,
      'response.data.message',
      error.message,
    );
    yield put(stopSubmit(formId, { _error: errorMessage }));
  } finally {
    if (yield cancelled()) {
      yield put(stopSubmit(formId));
    }
  }
}

export function* deleteTodo(id) {
  try {
    yield call(apiDeleteTodo, id);
    yield put(deleteTodoAction.success(id));
  } catch (error) {
    const errorMessage = yield call(
      get,
      error,
      'response.data.message',
      error.message,
    );
    yield put(deleteTodoAction.failure(errorMessage));
  } finally {
    if (yield cancelled()) {
      // cancelled...
    }
  }
}

export function* watchFetchTodos() {
  yield takeLatest(FETCH_TODOS.REQUEST, fetchTodos);
}

export function* watchFetchTodo() {
  yield takeLatest(FETCH_TODO.REQUEST, fetchTodo);
}

export function* watchUpdateTodo() {
  for (;;) {
    const { formId, data } = yield take(UPDATE_TODO.REQUEST);
    yield race({
      updateTodo: call(updateTodo, formId, data),
      cancelUpdateTodo: take(UPDATE_TODO.CANCEL),
    });
  }
}

export function* watchCreateTodo() {
  for (;;) {
    const { formId, data } = yield take(CREATE_TODO.REQUEST);
    yield race({
      createTodo: call(createTodo, formId, data),
      cancelCreateTodo: take(CREATE_TODO.CANCEL),
    });
  }
}

export function* watchDeleteTodo() {
  for (;;) {
    const { id } = yield take(DELETE_TODO.REQUEST);
    yield race({
      deleteTodo: call(deleteTodo, id),
      cancelDeleteTodo: take(DELETE_TODO.CANCEL),
    });
  }
}

export default function* root() {
  yield fork(watchFetchTodos);
  yield fork(watchFetchTodo);
  yield fork(watchUpdateTodo);
  yield fork(watchCreateTodo);
  yield fork(watchDeleteTodo);
}
