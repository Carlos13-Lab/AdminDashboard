const Router = require('express');
const AuthController = require('../controllers/auth.controller');

const controller = new AuthController()
const route = Router();


route.post('/login', controller.login)


module.exports = route;