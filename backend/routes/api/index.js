const express = require('express');
const router = express.Router();

const userController = require('../../controllers/user.controller');

router.post('/login', userController.login);

router.use('/projects', require('./projects'));

module.exports = router;
