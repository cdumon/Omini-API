const app = require(`${appRoot}/app`);
const models = require(`${appRoot}/models`);

app.get("/user", async (request, response) => {
    try {
        let result = await models.user.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});