const Router = require('express');
const UserController = require('../controllers/user.controller');

const controller = new UserController()
// const { validateJWT } = require('../middlewares/validateJWT');


const route = Router();

// route.use(validateJWT)
route.put('/', controller.update)
     .get('/list', controller.getUsers)
     .get('/', controller.find)
     .post('/', controller.create)
     .delete('/:id', controller.delete)


module.exports = route;