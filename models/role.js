const mongoose = require("mongoose");

const Role = mongoose.model("role", {
        name: {
            type: String,
            required: true
        }
    }
);

module.exports = Role;