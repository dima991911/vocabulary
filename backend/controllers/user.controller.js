const mongoose = require('mongoose');
const { validateEmail } = require('../helpers/helpers');

const User = mongoose.model('User');

module.exports.login = async (req, res) => {
    const { loginOrEmail, password } = req.body;
    let user = await User.findOne({ $or: [{ login: loginOrEmail }, { email: loginOrEmail }], password });

    if (!user) {
        res.status(404).send({ error: 'User not found' });
        return;
    }

    user = await User.findById(user._id, '-password');
    const token = user.getJwtToken();
    res.status(200).json({ token, user });
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

    let createdUser = await User.create({ login, password, email, nativeLanguage, phone });
    createdUser = await User.findById(createdUser._id, '-password');

    const token = createdUser.getJwtToken();

    res.status(200).json({ token, user: createdUser });
};

module.exports.auth = async (req, res) => {
    const { currentUser } = req;

    const user = await User.findById(currentUser._id, '-password');
    res.status(200).json({ user });
};
