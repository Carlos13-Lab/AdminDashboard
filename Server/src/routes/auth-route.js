const Router = require('express');

const { Register, Login } = require('../controllers/auth_controllers')

const route = Router();


route.post('/register', Register)
     .post('/login', Login)


module.exports = route;