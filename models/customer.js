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
    }
});

module.exports = Customer;