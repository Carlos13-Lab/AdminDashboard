const { serverError, success, error } = require("../helpers/response.js");
const StreamingServiceService = require("../services/streaming-service.service.js");

class StreamingServiceController {
  constructor() {
    this.service = new StreamingServiceService()
    this.getServices = this.getServices.bind(this)
    this.create = this.create.bind(this)
    this.delete = this.delete.bind(this)
    this.getById = this.getById.bind(this)
    this.update = this.update.bind(this)
  }

  async create(req, res) {
    try {
      const { body } = req;
      const streamingServiceCreated = await this.service.create(body);
      return success({
        res,
        message: "service created",
        data: streamingServiceCreated,
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
      const service = await this.service.getById(id);

      if (!service) {
        return serverError({
          res,
          message: "not found",
          status: 404,
        });
      }

      return success({
        res,
        message: "get API - list of service for ID",
        data: service,
        status: 200,
      });
    } catch (error) {
      console.error(`Error in serviceGetById:${error}`);
      return error(req, res, "Error getting service");
    }
  }

  async getServices(req, res) {
    try {
      const { limit, from } = req.query;

      const page = await this.service.getPage(from, limit);

      return success({
        res,
        message: "get API - list of service",
        data: page,
        status: 200,
      });
    } catch (err) {
      console.error(`Error in serviceGet:${err}`);
      return error(req, res, "Error getting list of service");
    }
  }

  async update(req, res) {
    try {
      const { body } = req;

      const streamingServiceUpdated = await this.service.update(body);

      if (!streamingServiceUpdated) {
        return error({
          res,
          message: "services not found",
          status: 404,
        });
      }

      return success({
        res,
        message: "services updated",
        data: streamingServiceUpdated,
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

      const streamingServiceDelete = await this.service.delete(id);

      if (!streamingServiceDelete) {
        return error({
          res,
          message: "services not found",
          status: 404,
        });
      }

      return success({
        res,
        message: "DELETE API - DELETE of service for ID",
        data: streamingServiceDelete,
        status: 200,
      });
    } catch (error) {
      console.error(`Error in ServicesDelete: ${error}`);
      return serverError({
        res,
        message: error.message,
        status: 500,
      });
    }
  }
}



module.exports = StreamingServiceController;
