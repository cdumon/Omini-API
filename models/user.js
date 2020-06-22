let Mongoose = require('mongoose');

const User = Mongoose.model("user", {
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    display_name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone_number: {
        type: String,
    },
    preferred_language: {
        type: String,
    },
    created_at: {
        type: Date,
    },
    password: {
        type: String,
    },
    roles: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Role",
    }],
    customer: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'customer'
    }
});

module.exports = User;