let Mongoose = require('mongoose');

const User = Mongoose.model("user", {
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    displayName: {
        type: String,
    },
    email: {
        type: String,
    },
    preferredLanguage: {
        type: String,
    },
    createdAt: {
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