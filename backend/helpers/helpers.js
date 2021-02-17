const { jwt } = require('../config/index');
const jsonwebtoken = require('jsonwebtoken');

module.exports.isTokenCorrect = token => {
    return jsonwebtoken.verify(token, jwt.secret, err => {
        return !err;
    });
};

module.exports.validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};
