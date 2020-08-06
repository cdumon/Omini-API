const app = require(`${appRoot}/app`);
const models = require(`${appRoot}/models`);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require("../../config.json");

app.post("/signin", (request, response) => {
    models.user.findOne({ email: request.body.email }).populate("roles", "-__v") .exec((err, user) => {
        if (err) {
            response.status(500).json({ message: err });
            return;
        }

        if (!user) {
            response.status(400).json({ message: "User Not found." });
            return
        }

        let passwordIsValid = bcrypt.compareSync(
            request.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return response.status(401).json({
                message: "Invalid Password"
            });
        }

        let token = jwt.sign({ id: user.id }, config.jwt.key.secret, {
            expiresIn: 3600
        });

        let authorities = [];

        for (let i = 0; i < user.roles.length; i++) {
            authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }
        response.status(200).send({
            user: user,
            accessToken: token
        });
    });
});