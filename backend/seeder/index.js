const mongoose = require('mongoose');

const { Word, WordTranslate, User, Language } = mongoose.models;

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

    const words = [
        { word: 'робити', language: createdLanguages[0]._id },
        { word: 'do', language: createdLanguages[1]._id },
        { word: 'створювати', language: createdLanguages[0]._id },
        { word: 'create', language: createdLanguages[1]._id },
    ];

    const createdWords = await Word.insertMany(words);

    const translate = [
        { word: createdWords[0]._id, translate: createdWords[1]._id, users: [createdUsers[0]._id] },
        { word: createdWords[2]._id, translate: createdWords[3]._id, users: [createdUsers[0]._id] },
    ];

    const createdTranslate = await WordTranslate.insertMany(translate);

    createdUsers[0].words = createdTranslate.map(ct => ct._id);
    await createdUsers[0].save();
}
