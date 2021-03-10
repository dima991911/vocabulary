const express = require('express');
const router = express.Router()

const isAuth = require('../../middleware/auth.middleware');

const userController = require('../../controllers/user.controller');
const wordController = require('../../controllers/word.controller');
const languageController = require('../../controllers/language.controller');

router.post('/login', userController.login);
router.post('/signup', userController.registration);
router.get('/auth', isAuth, userController.auth);

router.post('/word', isAuth, wordController.createWord);
router.get('/words', isAuth, wordController.getWords);
router.get('/themes', isAuth, wordController.getThemes);
router.put('/word/:id', isAuth, wordController.editWord);
router.delete('/word/:id', isAuth, wordController.deleteWord);
router.delete('/words', isAuth, wordController.deleteWords);

router.get('/languages', languageController.getLanguage);

module.exports = router;
