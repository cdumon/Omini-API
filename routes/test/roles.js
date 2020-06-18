const app = require(`${appRoot}/app`);
const authJwt = require(`${appRoot}/middlewares/authJWT`);

app.get("/test/role/public", (request, response) => {
    response.status(200).send("Public Content");
});

app.get("/test/role/user", [authJwt.verifyToken], (request, response) => {
    response.status(200).send("User Content");
});

app.get("/test/role/moderator", [authJwt.verifyToken, authJwt.isModerator], (request, response) => {
    response.status(200).send("Moderator Content");
});

app.get("/test/role/admin", [authJwt.verifyToken, authJwt.isAdmin], (request, response) => {
    response.status(200).send("Admin Content");
});