const mongoose = require('mongoose');

const Users = mongoose.model('Users');

module.exports.login = async(req, res) => {
    const { login, password } = req.body;
    const user = await Users.findOne({ login, password });

    if (!user) {
        res.status(404).send({ error: 'User not found' });
        return;
    }

    const token = user.getJwtToken();
    res.status(200).json({ token });
};
