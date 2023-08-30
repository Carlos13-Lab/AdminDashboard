const Router = require('express');

const { NewService, servicesGet, serviceGetById, updateServices} = require('../controllers/services_controllers');
const { validateJWT } = require('../middlewares/validateJWT');


const route = Router();

route.use(validateJWT)
route.post('/createservice', NewService)
     .get('/', servicesGet)
     .get('/:id',serviceGetById)
     .put('/:id', updateServices )


module.exports = route;