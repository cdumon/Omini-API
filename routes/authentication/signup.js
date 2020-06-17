const app = require(`${appRoot}/app`);
const { verifySignUp } = require(`${appRoot}/middlewares`);
const models = require(`${appRoot}/models`);
const bcrypt = require('bcryptjs')

app.post(`/signup`, [ verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted ], (request, response) => {
    const user = new models.user({
        ...request.body,
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