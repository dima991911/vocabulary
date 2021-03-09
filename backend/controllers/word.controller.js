const mongoose = require('mongoose');

const { Word, User, Language, Theme } = mongoose.models;

module.exports.createWord = async (req, res) => {
    const { word, translate, wordLanguage, translateLanguage } = req.body;
    const { currentUser } = req;

    if (!word || !translate || !wordLanguage || !translateLanguage) {
        res.status(400).send({ message: 'Not all data' });
        return;
    }

    if (wordLanguage === translateLanguage) {
        res.status(400).send({ message: 'Cannot be 2 equal languages' });
        return;
    }

    const languages = await Language.find();

    if (!languages.some(l => l._id.equals(wordLanguage)) || !languages.some(l => l._id.equals(translateLanguage))) {
        res.status(400).send({ message: 'Some language not found' });
        return;
    }

    const user = await User.findById(currentUser._id);
    const findWord = await Word.findOne({ word, translate, wordLanguage, translateLanguage, creator: user._id });

    if (findWord) {
        res.status(409).json({ message: 'Your have had already this word' });
        return;
    }

    const createdWord = await Word.create({ word, translate, wordLanguage, translateLanguage, creator: user._id });
    user.words.push(createdWord._id);
    await user.save();

    res.status(200).json({ word: createdWord });
};

module.exports.getWords = async (req, res) => {
    const { currentUser } = req;
    const { limit = 20, offset = 0 } = req.query;

    const words = await Word.paginate({ creator: currentUser._id }, { limit: limit, offset, sort: { createdAt: -1 } });

    res.status(200).json({ words: words.docs, countWords: words.totalDocs, currentPage: words.page });
};

module.exports.getThemes = async (req, res) => {
    const { currentUser } = req;

    const themes = await Theme.find({ creator: currentUser._id });

    res.status(200).json({ themes });
};

// TODO: create logic
module.exports.editWord = async (req, res) => {
    const { word, translate, wordLanguage, translateLanguage } = req.body;
    const { id } = req.params;

    res.status(200).json({ message: 'Have not implemented yet' });
};

module.exports.deleteWord = async (req, res) => {
    const { id: wordId } = req.params;
    const user = await User.findById(req.currentUser._id);
    const foundWord = await Word.findById(wordId);

    if (!foundWord) {
        res.status(404).send({ message: `Word not found` });
        return;
    }

    if (!user._id.equals(foundWord.creator)) {
        res.status(404).send({ message: `User doesn't have this word` });
        return;
    }

    if (foundWord.theme) {
        await _removeWordFromTheme(foundWord.theme, foundWord._id);
    }

    await foundWord.delete();
    user.words = user.words.filter(wId => !wId.equals(wordId));
    await user.save();
    res.status(200).json({ wordId });
};

const _removeWordFromTheme = async (themeId, wordId) => {
    const theme = await Theme.findById(themeId);
    theme.words = theme.words.filter(wId => !wId.equals(wordId));
    await theme.save();
}
