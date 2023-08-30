const Products = require("../models/products");
const Services = require("../models/Streamingservices");

const findById = async (id) => {
  const product = await Products.findById(id, ["email", "password", "status"])
    .populate({
      path: "service",
      select: "name",
    })
  return product;
};

const newProducts = async ({ id, body }) => {
  const { email, password, status } = body;

  const product = new Products({
    email,
    password,
    status,
    service: []
  });
  await product.save();
  const productService = await Services.findById(id)
  product.service.push(productService.id)
  const savedProducts = await product.save();



  return savedProducts;
};
const findByIdandUpdate = async ({ id, body }) => {
  const { email,
    password,
    status, } = body;

  const options = {
    email,
    password,
    status,
  };

  const updatedProduct = await Products.findByIdAndUpdate({ _id: id }, { $set: options }, { new: true });

  const data = findById(updatedProduct.id);

  return data;
};

module.exports = { newProducts, findByIdandUpdate, findById };
