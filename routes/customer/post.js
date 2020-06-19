const app = require(`${appRoot}/app`);
const models = require(`${appRoot}/models`);
let { capitalize_words } = require('../../utils');

app.post("/customer", async (request, response) => {
    try {
        let customer = new models.customer(request.body);
        customer.display_name = `${capitalize_words(customer.first_name)} ${capitalize_words(customer.last_name)}`;
        customer.created_at = new Date();
        let result = await customer.save();
        response.send(result);
    } catch (error) {
        logger.error(error);
        response.status(500).send(error);
    }
});