const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');

router.use('/', require('./api'));

module.exports = router;
