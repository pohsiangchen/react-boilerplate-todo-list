import get from 'lodash/get';
import { createSelector } from 'reselect';

/**
 * Direct selector to the todo state domain
 */
const selectTodoDomain = state => state.get('todo');
const selectTodos = state => state.getIn(['todo', 'datas']);
const selectTodosFetchLoading = state =>
  state.getIn(['todo', 'fetchAll', 'loading']);
const selectTodosFetchError = state =>
  state.getIn(['todo', 'fetchAll', 'error']);
const selectTodoFetchLoading = state =>
  state.getIn(['todo', 'fetch', 'loading']);
const selectTodoFetchError = state => state.getIn(['todo', 'fetch', 'error']);
const selectTodoDeleteLoading = state =>
  state.getIn(['todo', 'delete', 'loading']);
const selectTodoDeleteError = state => state.getIn(['todo', 'delete', 'error']);

/**
 * Other specific selectors
 */
const makeSelectTodos = () => createSelector(selectTodos, substate => substate);
const makeSelectTodosFetchLoading = () =>
  createSelector(selectTodosFetchLoading, substate => substate);
const makeSelectTodosFetchError = () =>
  createSelector(selectTodosFetchError, substate => substate);
const makeSelectTodoFetchLoading = () =>
  createSelector(selectTodoFetchLoading, substate => substate);
const makeSelectTodoFetchError = () =>
  createSelector(selectTodoFetchError, substate => substate);
const makeSelectTodoDeleteLoading = () =>
  createSelector(selectTodoDeleteLoading, substate => substate);
const makeSelectTodoDeleteError = () =>
  createSelector(selectTodoDeleteError, substate => substate);
const makeSelectTodoById = todoId =>
  createSelector(
    makeSelectTodos(),
    (state, props) => todoId || props.match.params.todoId,
    (todos, id) => {
      const foundIndex = todos.findIndex(data => get(data, 'id') === id);
      if (foundIndex > -1) return get(todos, foundIndex);
      return {};
    },
  );

/**
 * Default selector used by Todo
 */

const makeSelectTodo = () =>
  createSelector(selectTodoDomain, substate => substate.toJS());

export default makeSelectTodo;
export {
  selectTodoDomain,
  makeSelectTodos,
  makeSelectTodosFetchLoading,
  makeSelectTodosFetchError,
  makeSelectTodoFetchLoading,
  makeSelectTodoFetchError,
  makeSelectTodoDeleteLoading,
  makeSelectTodoDeleteError,
  makeSelectTodoById,
};
