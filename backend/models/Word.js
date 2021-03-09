const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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
    wordLanguage: { type: Schema.Types.ObjectId, ref: 'Language', required: true },
    translateLanguage: { type: Schema.Types.ObjectId, ref: 'Language', required: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true  },
    theme: {  type: Schema.Types.ObjectId, ref: 'Theme' },
}, {
    timestamps: true
});

WordSchema.plugin(mongoosePaginate);

mongoose.model('Word', WordSchema);
