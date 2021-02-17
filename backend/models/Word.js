const mongoose = require('mongoose');

const { Schema } = mongoose;

const WordSchema = new Schema({
    word: {
        type: String,
        required: true,
    },
    translate: {
        type: String,
        required: true,
    },
    wordLanguage: {
        type: String,
        required: true,
    },
    translateLanguage: {
        type: String,
        required: true,
    },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

mongoose.model('Word', WordSchema);
