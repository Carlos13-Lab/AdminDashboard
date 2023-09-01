const Router = require('express');

const {  saleNew, saleGet, saleGetById} = require('../controllers/sale_controllers');
// const { validateJWT } = require('../middlewares/validateJWT');


const route = Router();

// route.use(validateJWT)
route.post('/', saleNew)
     .get('/',saleGet)
     .get('/:id', saleGetById)

module.exports = route;