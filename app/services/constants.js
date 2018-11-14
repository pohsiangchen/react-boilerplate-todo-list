/*
 * api constants
 */

const url = {
  production: '',
  development: 'http://localhost:3000',
};
export const API_URL =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? url.development
    : url.production;

export const API_URL_PREFIX = 'api';
