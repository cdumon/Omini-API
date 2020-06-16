const app = require(`${appRoot}/app`);
const models = require(`${appRoot}/models`);

app.delete("/user/:id", async (request, response) => {
    try {
        let result = await models.user.deleteOne({ _id: request.params.id }).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});