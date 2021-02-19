const express = require('express');
const router = express.Router()

const isAuth = require('../../middleware/auth.middleware');

const userController = require('../../controllers/user.controller');
const wordController = require('../../controllers/word.controller');

router.post('/login', userController.login);
router.post('/registration', userController.registration);

router.post('/word', isAuth, wordController.createWord);
router.get('/words', isAuth, wordController.getWords);
router.put('/word/:id', isAuth, wordController.editWord);
router.delete('/word/:id', isAuth, wordController.deleteWord);

module.exports = router;
