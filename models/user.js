let Mongoose = require('mongoose');

const UserModel = Mongoose.model("user", {
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
});

module.exports = UserModel;