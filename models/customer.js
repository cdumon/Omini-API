let Mongoose = require('mongoose');

const CustomerModel = Mongoose.model("customer", {
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
});

module.exports = CustomerModel;