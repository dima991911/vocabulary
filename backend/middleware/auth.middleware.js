const { isTokenCorrect } = require('../helpers/helpers');

const isAuth = (req, res, next) => {
    const { token } = req.query;

    if (!token || !isTokenCorrect(token)) {
        throw new Error('You dont auth');
    } else {
        next();
    }
};

module.exports = isAuth;
