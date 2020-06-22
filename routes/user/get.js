const app = require(`${appRoot}/app`);
const models = require(`${appRoot}/models`);

app.get("/user", async (request, response) => {
    try {
        let result = await models.user
            .find({ "display_name": { "$regex": request.query.search || "", "$options": "i" }})
            .skip(Number(request.query.page) * Number(request.query.limit))
            .limit(Number(request.query.limit))
            .populate("customer")
            .exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/user/:id", async (request, response) => {
    try {
        let result = await models.user.findById(request.params.id).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});