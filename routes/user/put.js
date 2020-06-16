const app = require(`${appRoot}/app`);
const models = require(`${appRoot}/models`);

app.put("/user/:id", async (request, response) => {
    try {
        let user = await models.user.findById(request.params.id).exec();
        user.set(request.body);
        let result = await user.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});