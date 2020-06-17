let express = require('express');
let bodyParser = require("body-parser");
let mongoose = require('mongoose');
let config = require('./config.json');
let db_url = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;

mongoose.connect(db_url, config.db.config).catch(error => {
    console.error(error.toString());
    process.exit();
});
let connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
connection.once('open', function (){
    console.log(`Connected to database ${config.db.name} on ${db_url}`);
});

let app = express();
module.exports = app;

let router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

let host = config.server.host;
let port = config.server.port
app.listen(port, host, () => {
    console.log(`API started on ${host}:${port}`);
});

var path = require('path');
global.appRoot = path.resolve(__dirname);

const routes = require('./routes');