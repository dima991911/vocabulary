const mongoose = require('mongoose');

const { Schema } = mongoose;

const WordTranslateSchema = new Schema({
    word: { type: Schema.Types.ObjectId, ref: 'Word' },
    translate: { type: Schema.Types.ObjectId, ref: 'Word' },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, {
    timestamps: true
});

mongoose.model('WordTranslate', WordTranslateSchema);
