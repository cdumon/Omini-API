let Mongoose = require('mongoose');

const Transcription = Mongoose.model("transcription", {
    createdAt: {
        type: Date,
        required: true
    },
    finishedAt: {
        type: Date,
        required: true
    }
});

module.exports = Transcription;