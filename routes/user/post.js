const app = require(`${appRoot}/app`);
const models = require(`${appRoot}/models`);

app.post("/user", async (request, response) => {
    try {
        let user = new models.user(request.body);
        let result = await user.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});