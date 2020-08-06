const ROLES = require(`${appRoot}/constants/Roles`);
const models = require(`${appRoot}/models`);

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Checking email disponibility
    models.user.findOne({ email: req.body.email }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            res.send({ message: "Email already in use" });
            return;
        }

        next();
    });
};

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: `Role ${req.body.roles[i]} does not exist`
                });
                return;
            }
        }
    }

    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
};

module.exports = verifySignUp;