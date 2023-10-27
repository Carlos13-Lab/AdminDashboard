const { serverError, success, error } = require("../helpers/response.js");
const SaleService = require("../services/sale.service.js");

class SaleController {
  constructor() {
    this.service = new SaleService();
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
    this.getSales = this.getSales.bind(this);
  }
  async getById(req, res) {
    try {
      const { id } = req.params;
      const saleFound = await this.service.getById(id);

      if (!saleFound) {
        return serverError({
          res,
          message: `sale not found`,
          status: 404,
        });
      }

      return success({
        res,
        message: "get API - sale for ID",
        data: saleFound,
        status: 200,
      });
    } catch (error) {
      console.error(`Error in saleGetById:${error}`);
      return serverError({
        res,
        message: `Error in saleGet: ${error}`,
        status: 400,
      });
    }
  }

  async create(req, res) {
    try {
      const { body } = req;
      const saleCreated = await this.service.create(body);

      return success({
        res,
        message: "sale created",
        data: saleCreated,
        status: 201,
      });
    } catch (err) {
      return serverError({
        res,
        message: "Error creating a sale",
        status: 500,
      });
    }
  }

  async update(req, res) {
    try {
      const { body } = req;

      const saleUpdated = await this.service.update(body);

      if (!saleUpdated) {
        return error({
          res,
          message: "sale not found",
          status: 404,
        });
      }

      return success({
        res,
        message: "sale updated",
        data: saleUpdated,
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

  async getSales(req, res) {
    try {
      const { limit, from } = req.query;

      const page = await this.service.getSale(from, limit);

      return success({
        res,
        message: "get API - list of sales",
        data: page,
        status: 200,
      });
    } catch (err) {
      console.error(`Error in salesGet:${err}`);
      return error(req, res, "Error getting list of sales");
    }
  }

  async delete(req, res) {
    try {
      const { body } = req;

      const saleDeleted = await this.service.delete(body);

      if (!saleDeleted) {
        return error({
          res,
          message: "sale not found",
          status: 404,
        });
      }

      return success({
        res,
        message: "DELETE API - DELETE of sale for ID",
        data: saleDeleted,
        status: 200,
      });
    } catch (error) {
      console.error(`Error in saleDelete: ${error}`);
      return serverError({
        res,
        message: error.message,
        status: 500,
      });
    }
  }
}

module.exports = SaleController;
