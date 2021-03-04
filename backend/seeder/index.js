const mongoose = require('mongoose');

const { Word, Theme, User, Language } = mongoose.models;

const languages = [
    { name: 'Ukrainian', code: 'ua' },
    { name: 'English', code: 'en' },
]

module.exports = seed = async () => {
    const createdLanguages = await Language.insertMany(languages);

    const users = [
        { login: 'dima991911', password: '000000', email: 'dimon4uk.ds@gmai.com', nativeLanguage: createdLanguages[0]._id },
        { login: 'dima', password: '000000', email: 'dima@gmai.com', nativeLanguage: createdLanguages[0]._id },
    ];

    const createdUsers = await User.insertMany(users);

    const theme = { name: 'Main', creator: createdUsers[0]._id, words: [] }


    const createdTheme = await Theme.create(theme);

    const words = [
        { word: 'do', translate: 'робити', wordLanguage: createdLanguages[1]._id, translateLanguage: createdLanguages[0]._id, creator: createdUsers[0]._id },
        { word: 'create', translate: 'створювати', wordLanguage: createdLanguages[1]._id, translateLanguage: createdLanguages[0]._id, creator: createdUsers[0]._id },
        { word: 'draw', translate: 'малювати', wordLanguage: createdLanguages[1]._id, translateLanguage: createdLanguages[0]._id, creator: createdUsers[0]._id, theme: createdTheme._id },
        { word: 'some', translate: 'хтось', wordLanguage: createdLanguages[1]._id, translateLanguage: createdLanguages[0]._id, creator: createdUsers[0]._id, theme: createdTheme._id },
    ];

    const createdWords = await Word.insertMany(words);

    createdUsers[0].words = createdWords.map(w => w._id);
    await createdUsers[0].save();

    createdTheme.words = createdWords.filter(w => w.theme).map(w => w._id);
    await createdTheme.save();
}
