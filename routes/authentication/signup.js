const app = require(`${appRoot}/app`);
const { verifySignUp } = require(`${appRoot}/middlewares`);
const models = require(`${appRoot}/models`);

app.post(`/signup`, [ verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted ], (request, response) => {
    const user = new models.user({
        username: request.body.username,
        email: request.body.email,
        password: bcrypt.hashSync(request.body.password, 8)
    });

    user.save((err, user) => {
        if (err) {
            response.status(500).send({ message: err });
            return;
        }

        if (request.body.roles) {
            models.role.find({ name: { $in: request.body.roles }}, (err, roles) => {
                    if (err) {
                        response.status(500).send({ message: err });
                        return;
                    }

                    user.roles = roles.map(role => role._id);
                    user.save(err => {
                        if (err) {
                            response.status(500).send({ message: err });
                            return;
                        }

                        response.send({ message: "User was registered successfully!" });
                    });
                }
            );
        } else {
            models.role.findOne({ name: "user" }, (err, role) => {
                if (err) {
                    response.status(500).send({ message: err });
                    return;
                }

                user.roles = [role._id];
                user.save(err => {
                    if (err) {
                        response.status(500).send({ message: err });
                        return;
                    }

                    response.send({ message: "User was registered successfully!" });
                });
            });
        }
    });
});

app.post("/signin", (request, response) => {
    models.user.findOne({ username: request.body.username }).populate("roles", "-__v") .exec((err, user) => {
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
                    message: "Invalid Password!"
                });
            }

            let token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
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