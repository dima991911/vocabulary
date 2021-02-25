const mongoose = require('mongoose');

const { Schema } = mongoose;

const WordSchema = new Schema({
    word: {
        type: String,
        required: true,
    },
    language: { type: Schema.Types.ObjectId, ref: 'Language', required: true }
}, {
    timestamps: true
});

mongoose.model('Word', WordSchema);
