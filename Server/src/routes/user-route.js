const Router = require('express');

const {UpdateUser, userGet, userGetById, UserNew, addIdProductClient, userDelete } = require('../controllers/user_controllers');
// const { validateJWT } = require('../middlewares/validateJWT');


const route = Router();

// route.use(validateJWT)
route.put('/:id', UpdateUser)
     .get('/', userGet)
     .get('/:id', userGetById)
     .post('/', UserNew)
     .post('/add/:id', addIdProductClient)
     .delete('/:id', userDelete)


module.exports = route;