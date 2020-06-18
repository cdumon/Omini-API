let Mongoose = require('mongoose');

const Customer = Mongoose.model("customer", {
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    displayName: {
        type: String
    },
    preferredLanguage: {
        type: String,
    },
    createdAt: {
        type: Date
    },
    users: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }]
});

module.exports = Customer;