const { decodeToken } = require('../helpers/helpers');

const isAuth = (req, res, next) => {
    const { token } = req.query;

    const currentUser = decodeToken(token);
    if (!token || !currentUser) {
        res.status(401).send({ message: 'You dont auth' });
    } else {
        req.currentUser = currentUser;
        next();
    }
};

module.exports = isAuth;
