const Router = require("express");
const {validateJWT} = require('../middlewares/validateJWT')

const { Newproduct, productsGet, productGetById, updatedProduct } = require("../controllers/products_controllers");

const route = Router();

route.use(validateJWT)
route.post("/createproduct/:id",  Newproduct)
.get("/", productsGet).get("/:id", productGetById)
.put("/:id", updatedProduct);

module.exports = route;
