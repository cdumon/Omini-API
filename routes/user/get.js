const app = require(`${appRoot}/app`);
const models = require(`${appRoot}/models`);
const authJWT = require(`${appRoot}/middlewares/authJWT`);

app.get("/user", [ authJWT.verifyToken ], async (request, response) => {
    try {
        let result = await models.user
            .find({
                $or: [
                    {"display_name": {"$regex": request.query.search || "", "$options": "i"}},
                    {"email": {"$regex": request.query.search || "", "$options": "i"}}
                ]
            })
            .sort(request.query.sort === '-created_at' && '-created_at')
            .skip(Number(request.query.page) * Number(request.query.limit))
            .limit(Number(request.query.limit))
            .populate("customer")
            .exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/user/me", [ authJWT.verifyToken ], async (request, response) => {
    try {
        let result = await models.user.findById(request.id).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/user/:id", [ authJWT.verifyToken ], async (request, response) => {
    try {
        let result = await models.user.findById(request.params.id).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});