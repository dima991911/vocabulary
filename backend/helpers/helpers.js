const { jwt } = require('../config/index');
const jsonwebtoken = require('jsonwebtoken');

const isTokenCorrect = (token) => {
    return jsonwebtoken.verify(token, jwt.secret, err => {
        return !err;
    });
};

module.exports.isTokenCorrect = isTokenCorrect;
