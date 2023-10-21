const Router = require("express");
const ProductController = require("../controllers/product.controller");
// const {validateJWT} = require('../middlewares/validateJWT')

const controller = new ProductController();

const route = Router();

// route.use(validateJWT)
route
  .post("/createproduct/:id", controller.create)
  .get("/", controller.getProduct)
  .get("/:id", controller.getById)
  .put("/:id", controller.update)
  .delete("/:id", controller.delete);

module.exports = route;
