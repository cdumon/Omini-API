let Mongoose = require('mongoose');

const Conference = Mongoose.model("transcription", {
    created_at: {
        type: Date,
        required: true
    },
    finished_at: {
        type: Date,
        required: true
    },
    participants: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = Conference;