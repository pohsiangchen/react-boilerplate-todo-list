const express = require('express');
const todoRoutes = require('./routes/todoRoutes');

/**
 * Contains all API routes for the application.
 */
const router = express.Router();

/**
 * GET /api
 */
router.get('/', (req, res) => {
  res.json({
    app: req.app.locals.title,
    apiVersion: req.app.locals.version,
  });
});

router.use('/todos', todoRoutes);

module.exports = router;
