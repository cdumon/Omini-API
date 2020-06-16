const app = require(`${appRoot}/app`);
const models = require(`${appRoot}/models`);

app.put("/customer/:id", async (request, response) => {
    try {
        let customer = await models.customer.findById(request.params.id).exec();
        customer.set(request.body);
        let result = await customer.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});