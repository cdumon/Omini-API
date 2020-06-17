let Mongoose = require('mongoose');

const User = Mongoose.model("user", {
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    preferredLanguage: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: true
    }],
    customer: {
    type: Mongoose.Schema.Types.ObjectId,
        ref: 'customer',
        required: true
    }
});

module.exports = User;