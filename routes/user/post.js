const app = require(`${appRoot}/app`);
const models = require(`${appRoot}/models`);

app.post("/user", async (request, response) => {
    try {
        let user = new models.user(request.body);
        user.display_name = `${capitalize_words(user.first_name)} ${capitalize_words(user.last_name)}`;
        user.created_at = new Date();
        let result = await user.save();
        response.send(result);
    } catch (error) {
        logger.error(error);
        response.status(500).send(error);
    }
});