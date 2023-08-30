require("dotenv").config();
require("./database/config");
const {
    auth,
    service,
    product,
    profile,
    user
} = require('./routes/routes');

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const server = express();
let port = process.env.PORT || 3001

// Convierte una petición recibida (POST-GET...) a objeto JSON
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(
  cors({
    exposedHeaders: "*",
    allowedHeaders: "*",
  })
);

server.use('/api/demo/auth', auth);
server.use('/api/demo/service', service);
server.use('/api/demo/product', product);
server.use('/api/demo/profile', profile);
server.use('/api/demo/user', user);



server.listen(port, function () {
  console.log(`Server running in http://localhost:${port}`);
});
