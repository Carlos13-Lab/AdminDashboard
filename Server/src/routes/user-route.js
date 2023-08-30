const Router = require('express');

const { userfindUpdate, userGet, userGetById, UserNew, addIdProductClient } = require('../controllers/user_controllers');
const { validateJWT } = require('../middlewares/validateJWT');


const route = Router();

route.use(validateJWT)
route.put('/:id', userfindUpdate)
     .get('/', userGet)
     .get('/:id', userGetById)
     .post('/:id', UserNew)
     .post('/add/:id', addIdProductClient)


module.exports = route;