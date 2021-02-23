const mongoose = require('mongoose');

const { Word, User, Language, WordTranslate } = mongoose.models;

module.exports.createWord = async (req, res) => {
    const { word, translate, wordLanguageId, translateLanguageId } = req.body;
    const { currentUser } = req;

    if (!word || !translate || !wordLanguageId || !translateLanguageId) {
        res.status(400).send({ message: 'Not all data' });
        return;
    }

    if (wordLanguageId === translateLanguageId) {
        res.status(400).send({ message: 'Cannot be 2 equal languages' });
        return;
    }

    const languages = await Language.find();

    if (!languages.some(l => l._id.equals(wordLanguageId)) || !languages.some(l => l._id.equals(translateLanguageId))) {
        res.status(400).send({ message: 'Some language not found' });
        return;
    }

    const user = await User.findById(currentUser._id);

    const findWord = await _createWordIfNotExist(word, wordLanguageId);
    const findWordTranslate = await _createWordIfNotExist(translate, translateLanguageId);
    const findTranslate = await WordTranslate.findOne({ word: findWord.word._id, translate: findWordTranslate.word._id });

    if ((findWord.status === CreatedOrFetchedEnum.CREATED || findWordTranslate.status === CreatedOrFetchedEnum.CREATED) || !findTranslate) {
        const createdTranslate = await _createWordTranslate(findWord, findWordTranslate, user);

        res.status(200).json({ word: createdTranslate });
        return;
    }

    if (user.words.some(wordId => findTranslate._id.equals(wordId))) {
        res.status(400).json({ message: 'You have had this message already' });
        return;
    }

    findTranslate.users.push(user._id);
    user.words.push(findTranslate._id);
    await findTranslate.save();
    await user.save();

    res.status(200).json({ word: findWordTranslate });
};

module.exports.getWords = async (req, res) => {
    const { currentUser } = req;
    // TODO: get count instead users ids
    const user = await User.findById(currentUser._id)
        .populate({
            path: 'words',
            options: { sort: { 'createdAt': -1 } },
            populate: {
                path: 'word translate',
                select: 'word -_id'
            }
        });

    res.status(200).json({ user });
};

// TODO: create logic
module.exports.editWord = async (req, res) => {
    const { word, translate, wordLanguage, translateLanguage } = req.body;
    const { id } = req.params;

    res.status(200).json({ message: 'Have not implemented yet' });
};

module.exports.deleteTranslate = async (req, res) => {
    const { id: translateId } = req.params;
    const user = await User.findById(req.currentUser._id);
    const foundTranslate = await WordTranslate.findById(translateId);

    if (!foundTranslate) {
        res.status(404).send({ message: `Translate not found` });
        return;
    }

    if (!foundTranslate.users.some(userId => user._id.equals(userId)) ||
        !user.words.some(translateId => foundTranslate._id.equals(translateId))
    ) {
        res.status(404).send({ message: `User doesn't have this translate` });
        return;
    }

    await _deleteTranslateFromUserWords(user, foundTranslate);

    res.status(200).json({ deletedTranslateId: foundTranslate._id });
};

const CreatedOrFetchedEnum = {
    CREATED: 'CREATED',
    FETCHED: 'FETCHED',
}

const _createWordIfNotExist = async (wordText, languageId) => {
    let word = await Word.findOne({ word: wordText, language: languageId });
    if (!word) {
        word = await Word.create({ word: wordText, language: languageId });
        return { word, status: CreatedOrFetchedEnum.CREATED };
    }
    return { word, status: CreatedOrFetchedEnum.FETCHED };
};

const _createWordTranslate = async (word, translate, user) => {
    let createdTranslate = await WordTranslate.create({ word: word.word._id, translate: translate.word._id, users: [user._id] });
    user.words.push(createdTranslate._id);
    await user.save();

    const populateOptions = [{ path: 'word', select: 'word -_id' }, { path: 'translate', select: 'word -_id' }];
    createdTranslate = await WordTranslate.populate(createdTranslate, populateOptions);

    return createdTranslate;
};

const _deleteTranslateFromUserWords = async (user, translate) => {
    const findTranslateIndex = user.words.findIndex(wordId => translate._id.equals(wordId));
    user.words.splice(findTranslateIndex, 1);

    const findUserIndex = translate.users.findIndex(userId => user._id.equals(userId));
    translate.users.splice(findUserIndex, 1);
    await user.save();
    await translate.save();
};
