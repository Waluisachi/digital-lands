const express = require('express');
const router = express.Router();

// Modules
const { blocks, transact, search } = require('../controllers/blockchain');

// Routes
router.route('/').get(blocks);
router.route('/transact').post(transact);
router.route('/get-transaction').get(search);

module.exports = router;
