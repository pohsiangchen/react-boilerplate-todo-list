import axios, { CancelToken } from 'axios';
import { CANCEL } from 'redux-saga';

// Axios did not sent the same headers as a straight XHR request.
// Add this to retain session for each request headers.
// axios.defaults.withCredentials = true;
export function setRequestHeadersWithApikey(key) {
  axios.defaults.headers.common.Authorization = `api_key ${key}`;
}

export function removeRequestHeadersWithApikey() {
  delete axios.defaults.headers.common.Authorization;
}

export function fetch(url, params, configs) {
  const source = CancelToken.source();
  const request = axios.get(url, {
    withCredentials: true,
    cancelToken: source.token,
    params,
    ...configs,
  });
  request[CANCEL] = () => source.cancel();
  return request;
}

export function create(url, body, configs) {
  const source = CancelToken.source();
  const config = {
    withCredentials: true,
    cancelToken: source.token,
    ...configs,
  };
  const request = axios.post(url, body, config);
  request[CANCEL] = () => source.cancel();
  return request;
}

export function update(url, body) {
  const source = CancelToken.source();
  const config = {
    withCredentials: true,
    cancelToken: source.token,
  };
  const request = axios.patch(url, body, config);
  request[CANCEL] = () => source.cancel();
  return request;
}

export function remove(url, params) {
  const source = CancelToken.source();
  const config = {
    withCredentials: true,
    cancelToken: source.token,
    params,
  };
  const request = axios.delete(url, config);
  request[CANCEL] = () => source.cancel();
  return request;
}
