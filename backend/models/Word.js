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
    countTranslate: {
        type: Number,
        default: 1,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    firstTranslate: {
        type: Schema.Types.ObjectId,
        ref: 'Word',
        default: null,
    },
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true
});

mongoose.model('Word', WordSchema);
