const express = require('express');

//Initialization
const router = express.Router();

// Modules
const { login, register, account } = require('../controllers/user');

// Routes
router.route('/login').post(login);

// Register
router.route('/register').post(register);

// Accounts
router.get('/account').get(account);

module.exports = router;
