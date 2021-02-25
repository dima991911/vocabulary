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
        res.status(409).json({ error: 'Your have had already this word' });
        return;
    }

    let createdWord = await Word.create({ word, translate, wordLanguage, translateLanguage, creator: user._id });
    createdWord = await Word.populate(createdWord, [{ path: 'wordLanguage' }, { path: 'translateLanguage' }]);
    user.words.push(createdWord._id);
    await user.save();

    res.status(200).json({ word: createdWord });
};

module.exports.getWords = async (req, res) => {
    const { currentUser } = req;
    // TODO: get count instead users ids
    const user = await User.findById(currentUser._id)
        .populate({
            path: 'words',
            options: { sort: { 'createdAt': -1 } },
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
    res.status(200).json({ wordId });
};

const _removeWordFromTheme = async (themeId, wordId) => {
    const theme = await Theme.findById(themeId);
    theme.words = theme.words.filter(wId => !wId.equals(wordId));
    await theme.save();
}
