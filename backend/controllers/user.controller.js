const mongoose = require('mongoose');
const { validateEmail } = require('../helpers/helpers');

const User = mongoose.model('User');

module.exports.login = async (req, res) => {
    const { loginOrEmail, password } = req.body;
    const user = await User.findOne({ $or: [{ login: loginOrEmail }, { email: loginOrEmail }], password });

    if (!user) {
        res.status(404).send({ error: 'User not found' });
        return;
    }

    const token = user.getJwtToken();
    res.status(200).json({ token });
};

module.exports.registration = async (req, res) => {
    const { login, password, email, nativeLanguage, phone } = req.body;

    if (!login || !password || !email) {
        res.status(400).send({ error: 'Not all data' });
        return;
    }
    if (!validateEmail(email)) {
        res.status(400).send({ error: 'Type correct email' });
        return;
    }

    const user = await User.findOne({ $or: [{ login }, { email }] });

    if (user) {
        res.status(409).send({ error: 'User with this login or email already exist' });
        return;
    }

    const createdUser = await User.create({ login, password, email, nativeLanguage, phone });
    const token = createdUser.getJwtToken();

    res.status(200).json({ token });
};
