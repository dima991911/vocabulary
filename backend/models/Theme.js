const mongoose = require('mongoose');

const { Schema } = mongoose;

const ThemeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    words: [{ type: Schema.Types.ObjectId, ref: 'Word' }],
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true  },
}, {
    timestamps: true
});

mongoose.model('Theme', ThemeSchema);
