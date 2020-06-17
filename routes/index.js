const app = require(`${appRoot}/app`);
const fs = require('fs');

/* Helper function */
app.get('/', (req, res) => {
    res.send("Welcome to the Omini official API.\nPlease find more info here: https://example.com")
});

/*
 * initializes all models and sources them as .model-name
 */
fs.readdirSync(__dirname).forEach((file) => {
    if (file !== 'index.js') {
        fs.readdir(`${__dirname}/${file}`, (err, files) => {
            files.forEach((fileName) => {
                require(`${__dirname}/${file}/${fileName}`);
            });
        });
    }
});