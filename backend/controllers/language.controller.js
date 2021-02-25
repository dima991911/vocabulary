const mongoose = require('mongoose');

const Language = mongoose.model('Language');

module.exports.getLanguage = async (req, res) => {
    const languages = await Language.find();
    res.status(200).json({ languages });
};
