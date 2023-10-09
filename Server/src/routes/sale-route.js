const Router = require('express');

const { saleNew, saleGet, saleGetById, updateSale, saleDelete } = require('../controllers/sale_controllers');
// const { validateJWT } = require('../middlewares/validateJWT');


const route = Router();

// route.use(validateJWT)
route.post('/createSale', saleNew)
     .get('/',saleGet)
     .get('/:id', saleGetById)
     .put('/:id', updateSale)
     .delete('/delete/:id', saleDelete)

module.exports = route;