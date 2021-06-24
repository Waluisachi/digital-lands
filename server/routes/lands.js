const express = require('express');

//Initialization
const router = express.Router();

// Middleware


// Modules
const { properties, addProperty, transfer, search } = require('../controllers/blockchain');
// Properties
router.route('/properties').get(properties);

//Add property
router.route('/add-property').post(addProperty);

// Transfer property
router.route('/transfer').post(transfer);

// Search
router.route('/search/:key').post(search);

module.exports = router;
