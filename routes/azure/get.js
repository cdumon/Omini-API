const app = require(`${appRoot}/app`);
const config = require('../../config.json');
const axios = require('axios');
const qs = require('querystring');

app.get("/azure/token", (request, response) => {
    const postBody = {
        grant_type: "client_credentials",
        client_id: config.azureCredentials.clientId,
        client_secret: config.azureCredentials.clientSecret,
        resource: config.azureCredentials.resource
    }
    const postConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    axios.post(`https://login.microsoftonline.com/${config.azureCredentials.tenantId}/oauth2/token`,
        qs.stringify(postBody),
        postConfig)
        .then(microsoftResponse => {
            console.log(microsoftResponse);
            response.send(microsoftResponse.data);
        })
        .catch(error => {
            logger.error(error.response);
            console.log(error.response);
            response.status(error.response.status).send(error.response.data);
        });
});