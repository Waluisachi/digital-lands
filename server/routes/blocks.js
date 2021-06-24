const express = require('express');
const router = express.Router();

// Modules
const { blocks } = require('../controllers/blockchain');

// Routes
router.route('/').get(blocks);

module.exports = router;
