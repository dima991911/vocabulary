const { jwt } = require('../config/index');
const jsonwebtoken = require('jsonwebtoken');

module.exports.decodeToken = token => {
    return jsonwebtoken.verify(token, jwt.secret, (err, decoded) => {
        if (err) return false;
        return decoded;
    });
};

module.exports.validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};
