const Router = require('express');
const StreamingServiceController = require('../controllers/streaming-service.controller');
// const { validateJWT } = require('../middlewares/validateJWT');


const controller = new StreamingServiceController() 

const route = Router();

// route.use(validateJWT)
route.post('/createservice', controller.create)
     .get('/', controller.getServices)
     .get('/:id', controller.getById)
     .put('/', controller.update)
     .delete('/:id', controller.delete)


module.exports = route;