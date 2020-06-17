const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const config = require('./config.json');
const cors = require('cors');
const db_url = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;

mongoose.connect(db_url, config.db.config).catch(error => {
    console.error(error.toString());
    process.exit();
});
let connection = mongoose.connection;

connection.on('error', () => {
    console.error(`Could not connect to database ${config.db.name} on ${db_url}`)
    process.exit();
});
connection.once('open', function (){
    console.log(`Connected to database ${config.db.name} on ${db_url}`);
    initial();
});

let app = express();
let router = express.Router();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(router);
module.exports = app;

let host = config.server.host;
let port = config.server.port

var path = require('path');
global.appRoot = path.resolve(__dirname);

require('./routes');
const models = require("./models");
const ROLES = require('./constants/Roles')

app.listen(port, host, () => {
    console.log(`API started on ${host}:${port}`);
});

const initial = () => {
    models.role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            ROLES.forEach(role => {
                new models.role({
                    name: role
                }).save(err => {
                    if (err)
                        console.error(err);
                    console.log(`Added ${role} to database ${config.db.name} on ${db_url}`);
                });
            })
        }
    });
}