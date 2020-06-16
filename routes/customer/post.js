const app = require(`${appRoot}/app`);
const models = require(`${appRoot}/models`);

app.post("/customer", async (request, response) => {
    try {
        let customer = new models.customer(request.body);
        let result = await customer.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});