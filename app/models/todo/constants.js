/*
 *
 * Todo constants
 *
 */

import { makeActionType } from 'utils/constantsHelper';

export const FETCH_TODOS = makeActionType('app/models/todo/FETCH_TODOS');
export const FETCH_TODO = makeActionType('app/models/todo/FETCH_TODO');
export const CREATE_TODO = makeActionType('app/models/todo/CREATE_TODO');
export const UPDATE_TODO = makeActionType('app/models/todo/UPDATE_TODO');
export const DELETE_TODO = makeActionType('app/models/todo/DELETE_TODO');
