const app = require(`${appRoot}/app`);
const models = require(`${appRoot}/models`);

app.get("/customer", async (request, response) => {
    try {
        let result = await models.customer
            .find({ "display_name": { "$regex": request.query.search || "", "$options": "i" }})
            .skip(Number(request.query.page) * Number(request.query.limit))
            .limit(Number(request.query.limit))
            .exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/customer/:id", async (request, response) => {
    try {
        let result = await models.customer.findById(request.params.id).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});