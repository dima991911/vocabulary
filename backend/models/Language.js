const mongoose = require('mongoose');

const { Schema } = mongoose;

const LanguageSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    }
}, {
    timestamps: true
});

mongoose.model('Language', LanguageSchema);
