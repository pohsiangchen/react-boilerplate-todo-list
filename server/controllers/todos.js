const HttpStatus = require('http-status-codes');
const Boom = require('boom');
const Joi = require('joi');
const Todo = require('../models/todo');
const todoJoiSchema = require('../validators/todoJoiSchema');

/**
 * Get all todos.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.fetchAll = (req, res, next) => {
  Todo.find()
    .sort([['name', 'ascending']])
    .exec((err, data) => {
      if (err) return next(err);
      return res.json({ data });
    });
};

/**
 * Get a todo by its id.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.fetchById = (req, res, next) => {
  Todo.findById(req.params.id, (err, data) => {
    if (err) return next(err);
    if (data == null) {
      return next(Boom.notFound('Todo not found'));
    }
    return res.json({ data });
  });
};

/**
 * Create a new todo.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.create = (req, res, next) => {
  const result = Joi.validate(req.body, todoJoiSchema);
  if (result.error) {
    next(result.error);
  } else {
    const todo = new Todo({
      name: req.body.name,
    });
    todo.save((err, data) => {
      if (err) next(err);
      res.status(HttpStatus.CREATED).json({ data });
    });
  }
};

/**
 * Update a todo.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.update = (req, res, next) => {
  const todo = new Todo({
    ...req.body,
    _id: req.params.id,
  });
  Todo.findByIdAndUpdate(req.params.id, todo, { new: true }, (err, data) => {
    if (err) return next(err);
    return res.json({ data });
  });
};

/**
 * Delete a todo.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.deleteTodo = (req, res, next) => {
  Todo.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) return next(err);
    return res.status(HttpStatus.NO_CONTENT).json({ data });
  });
};
