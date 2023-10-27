const { serverError, success, error } = require("../helpers/response.js");
const Sale = require("../models/sale.model.js");
const Profiles = require("../models/profile.model.js");
const { Product } = require("../models/index.js");
const User = require("../models");
const ProductService = require("../services/product.service.js");

class ProductController {
  constructor() {
    this.service = new ProductService();
    this.create = this.create.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.update = this.update.bind(this);
    this.getById = this.getById.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req, res) {
    try {
      const { body } = req;
      const productCreated = await this.service.create(body);

      return success({
        res,
        message: "product creation successfully",
        data: productCreated,
        status: 201,
      });
    } catch (error) {
      return serverError({
        res,
        message: error.message,
        status: 500,
      });
    }
  }
  async getById(req, res) {
    try {
      const { id } = req.params;
      const product = await this.service.findById(id);

      if (!product) {
        return serverError({
          res,
          message: "not found",
          status: 404,
        });
      }

      return success({
        res,
        message: "get API - list of product for ID",
        data: product,
        status: 200,
      });
    } catch (err) {
      console.error(`Error in productGetById:${err}`);
      return error(req, res, "Error getting product");
    }
  }

  async getProduct(req, res) {
    try {
      const { limit, from } = req.query;

      const page = await this.service.getPage(from, limit);

      return success({
        res,
        message: "get API - list of product",
        data: page,
        status: 200,
      });
    } catch (err) {
      console.error(`Error in productGet:${err}`);
      return error(req, res, "Error getting list of product");
    }
  }

  async update(req, res) {
    try {
      const { body } = req;

      const productUpdated = await this.service.update(body);

      if (!productUpdated) {
        return error({
          res,
          message: "product not found",
          status: 404,
        });
      }

      return success({
        res,
        message: "product updated",
        data: productUpdated,
        status: 202,
      });
    } catch (err) {
      return serverError({
        res,
        message: err.message,
        status: 500,
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const productDeleted = await this.service.delete(id);

      if (!productDeleted) {
        return error({
          res,
          message: "product not found",
          status: 404,
        });
      }

      return success({
        res,
        message: "DELETE API - DELETE of product for ID",
        data: productDeleted,
        status: 200,
      });
    } catch (error) {
      console.error(`Error in ProductDelete: ${error}`);
      return serverError({
        res,
        message: error.message,
        status: 500,
      });
    }
  }
}

const productDelete = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const saleUpdateResult = await Sale.updateMany(
      { Info: product.id },
      {
        $unset: { Info: 1 },
        $set: { status: false },
      }
    );
    console.log("Sale updated:", saleUpdateResult);

    const profilesDeletedPast = await Profiles.findOneAndDelete({
      product: product.id,
    });
    console.log("Profiles deleted:", profilesDeletedPast);

    const usersUpdateResult = await User.updateMany(
      { product: product.id },
      { $unset: { product: 1 } }
    );
    console.log("Users updated:", usersUpdateResult);

    return res.status(201).json({
      message: "Product deleted successfully",
      data: product,
    });
  } catch (error) {
    console.error(`Error in productDelete: ${error}`);
    return res.status(500).json({ message: "Error deleting the product" });
  }
};

module.exports = ProductController;
