const Router = require("express");
// const {validateJWT} = require('../middlewares/validateJWT')

const { Newproduct, productsGet, productGetById, updatedProduct, productDelete } = require("../controllers/products_controllers");

const route = Router();

// route.use(validateJWT)
route.post("/createproduct/:id",  Newproduct)
.get("/", productsGet).get("/:id", productGetById)
.put("/:id", updatedProduct)
.delete("/:id",productDelete)

module.exports = route;
