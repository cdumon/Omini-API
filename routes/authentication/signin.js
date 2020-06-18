const app = require(`${appRoot}/app`);
const models = require(`${appRoot}/models`);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require(`${appRoot}/config.json`);

app.post("/signin", (request, response) => {
    models.user.findOne({ email: request.body.email }).populate("roles", "-__v") .exec((err, user) => {
        if (err) {
            response.status(500).send({ message: err });
            return;
        }

        if (!user) {
            return response.status(404).send({ message: "User Not found." });
        }

        let passwordIsValid = bcrypt.compareSync(
            request.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return response.status(401).send({
                accessToken: null,
                message: "Invalid Password"
            });
        }

        let token = jwt.sign({ id: user.id }, "secret", {
            expiresIn: config.jwt.token.expiresIn
        });

        let authorities = [];

        for (let i = 0; i < user.roles.length; i++) {
            authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }
        response.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        });
    });
});