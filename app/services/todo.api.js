import { fetch, create, update, remove } from 'utils/request';
import { API_URL, API_URL_PREFIX } from './constants';

/**
 * Fetch todos
 *
 * @param {object} param filter parameters { ip }
 * @return {Promise} Promise object
 */
export function fetchTodos(param = {}) {
  const url = `${API_URL}/${API_URL_PREFIX}/todos`;
  return fetch(url, param);
}
export function fetchTodo(id) {
  const url = `${API_URL}/${API_URL_PREFIX}/todos/${id}`;
  return fetch(url);
}
/**
 * Create todo
 *
 * @param {object} data { name, ip }
 * @return {Promise} Promise object
 */
export function createTodo(data) {
  const url = `${API_URL}/${API_URL_PREFIX}/todos`;
  return create(url, data);
}
export function deleteTodo(id) {
  const url = `${API_URL}/${API_URL_PREFIX}/todos/${id}`;
  return remove(url);
}
/**
 * Update todo with id
 *
 * @param {string} id todo's id
 * @param {object} data { name, ip }
 * @return {Promise} Promise object
 */
export function updateTodo(id, data) {
  const url = `${API_URL}/${API_URL_PREFIX}/todos/${id}`;
  return update(url, data);
}
