const app = require(`${appRoot}/app`);
const config = require('../../config.json');
const axios = require('axios');

//https://management.azure.com/subscriptions/{{subscriptionId}}/providers/Microsoft.Consumption/usageDetails?
// api-version=2019-11-01&
// $expand=properties/meterDetails&
// $filter=properties/usageStart eq '2020-07-01' and properties/usageEnd eq '2020-07-07'
app.get("/azure/usageDetails", (request, response) => {
    axios.get(`https://management.azure.com/subscriptions/{{subscriptionId}}/providers/Microsoft.Consumption/usageDetails?api-version=2019-11-01&$expand=properties/meterDetails&$filter=properties/usageStart eq '2020-07-01' and properties/usageEnd eq '2020-07-07'`)
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