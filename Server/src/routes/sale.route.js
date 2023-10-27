const Router = require('express');

const SaleController = require('../controllers/sale.controller');
// const { validateJWT } = require('../middlewares/validateJWT');

const controller = new SaleController()
const route = Router();

// route.use(validateJWT)
route.post('/createSale', controller.create)
     .get('/list', controller.getSales)
     .get('/:id', controller.getById )
     .put('/', controller.update)
     .delete('/delete/:id', controller.delete)

module.exports = route;