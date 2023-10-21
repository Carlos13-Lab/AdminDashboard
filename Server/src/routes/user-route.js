const Router = require('express');

const {UpdateUser, userGet, userGetById, UserNew, UserNewClient, userDelete } = require('../controllers/user_controllers');
// const { validateJWT } = require('../middlewares/validateJWT');


const route = Router();

// route.use(validateJWT)
route.put('/:id', UpdateUser)
     .get('/', userGet)
     .get('/:id', userGetById)
     .post('/', UserNew)
     .post('/client', UserNewClient)
     .delete('/:id', userDelete)


module.exports = route;