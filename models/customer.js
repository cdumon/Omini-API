let Mongoose = require('mongoose');

const Customer = Mongoose.model("customer", {
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    display_name: {
        type: String
    },
    preferred_language: {
        type: String,
    },
    created_at: {
        type: Date
    },
    users: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }]
});

module.exports = Customer;