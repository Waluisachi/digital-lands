const express = require('express');
const router = express.Router();

// Modules
const { publicKey, getBalance, privateKey, updateBalance } = require('../controllers/blockchain');

// Routes
router.route('/publicKey').get(publicKey);
router.route('/privateKey').get(privateKey);
router.route('/balance').get(getBalance);
router.route('/update-balance').post(updateBalance);


module.exports = router
