const mongoose = require('mongoose');

const Word = mongoose.model('Word');
const User = mongoose.model('User');

module.exports.createWord = async (req, res) => {
    const { word, translate, wordLanguage, translateLanguage } = req.body;
    const { currentUser } = req;

    if (!word || !translate || !wordLanguage || !translateLanguage) {
        res.status(400).send({ message: 'Not all data' });
        return;
    }

    const user = await User.findById(currentUser._id);
    const findWordInCurrentUser = await Word.findOne({ word, translate, wordLanguage, translateLanguage, creator: user._id });

    if (findWordInCurrentUser) {
        res.status(400).send({ message: 'You already have this word' });
        return;
    }

    const findWordGlobal = await Word.findOne({ word, translate, wordLanguage, translateLanguage, firstTranslate: null });
    const createdWord = new Word({ word, translate, wordLanguage, translateLanguage, creator: user._id });

    if (findWordGlobal) {
        findWordGlobal.countTranslate += 1;
        createdWord.firstTranslate = findWordGlobal._id;
        await findWordGlobal.save();
    }

    await createdWord.save();
    user.words.push(createdWord._id);
    await user.save();

    res.status(200).json({ word: createdWord });
};

module.exports.getWords = async (req, res) => {
    const { currentUser } = req;
    const user = await User.findById(currentUser._id).populate({ path: 'words', options: { sort: { 'createdAt': -1 } } });

    res.status(200).json({ user });
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

    if (!foundWord.creator._id.equals(user._id)) {
        res.status(400).send({ message: `You didn't create this word` });
        return;
    }

    if (foundWord.firstTranslate) {
        const firstTranslate = await Word.findById(foundWord.firstTranslate);

        if (firstTranslate.countTranslate === 1) {
            await firstTranslate.delete();
        } else {
            firstTranslate.countTranslate -= 1;
            await firstTranslate.save();
        }

        await foundWord.delete();
        res.status(200).json({ message: 'Word was deleted' });
        return;
    }

    if (foundWord.countTranslate === 1) {
        await foundWord.delete();
    } else {
        foundWord.isDeleted = true;
        foundWord.countTranslate -= 1;
        await foundWord.save();
    }

    res.status(200).json({ ok: 'ok' });
};
