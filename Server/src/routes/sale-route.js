const Router = require('express');

const { saleNew, saleGet, saleGetById, updateSale ,SaleRemove} = require('../controllers/sale_controllers');
// const { validateJWT } = require('../middlewares/validateJWT');


const route = Router();

// route.use(validateJWT)
route.post('/', saleNew)
     .get('/',saleGet)
     .get('/:id', saleGetById)
     .put('/:id', updateSale)
     .delete('/delete/:id', SaleRemove)

module.exports = route;