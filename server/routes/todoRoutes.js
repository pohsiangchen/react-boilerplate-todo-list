const express = require('express');
const todoController = require('../controllers/todos');

const router = express.Router();

/**
 * GET /api/todos
 */
router.get('/', todoController.fetchAll);

/**
 * GET /api/todos/:id
 */
router.get('/:id', todoController.fetchById);

/**
 * POST /api/todos
 */
router.post('/', todoController.create);

/**
 * PATCH /api/todos/:id
 */
router.patch('/:id', todoController.update);

/**
 * DELETE /api/todos/:id
 */
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
