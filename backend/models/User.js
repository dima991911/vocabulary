const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const config = require('../config');

const { Schema } = mongoose;

const UserSchema = new Schema({
    login: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        unique: true,
        index: true,
        sparse: true,
    },
    nativeLanguage: {
        type: Schema.Types.ObjectId,
        ref: 'Language',
        required: true,
    },
    words: [{ type: Schema.Types.ObjectId, ref: 'WordTranslateSchema' }],
}, {
    timestamps: true
});

UserSchema.methods.generateJWT = function () {
    const expirationDate = new Date().getTime();

    return jwt.sign({
        login: this.login,
        _id: this._id,
        exp: expirationDate,
    }, config.jwt.secret);
};

UserSchema.methods.getJwtToken = function () {
    return this.generateJWT();
};

mongoose.model('User', UserSchema);
