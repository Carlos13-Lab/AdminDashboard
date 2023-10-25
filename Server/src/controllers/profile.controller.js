const { serverError, success, error } = require("../helpers/response.js");
const ProfileService = require("../services/profile.service.js");

const {
  newProfile,
  findByIdProfile,
  findByIdandUpdate,
} = require("../services/profile.service.js");

class ProfileController {
  constructor() {
    this.service = new ProfileService();
    this.create = this.create.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.update = this.update.bind(this);
    this.getById = this.getById.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req, res) {
    try {
      const { body } = req;
      const profileCreated = await this.service.create(body);

      return success({
        res,
        message: "profile creation successfully",
        data: profileCreated,
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
      const profile = await this.service.findById(id);

      if (!profile) {
        return serverError({
          res,
          message: "not found",
          status: 404,
        });
      }

      return success({
        res,
        message: "get API - list of profile for ID",
        data: profile,
        status: 200,
      });
    } catch (err) {
      console.error(`Error in profileGetById:${err}`);
      return error(req, res, "Error getting profile");
    }
  }

  async getProfile(req, res) {
    try {
      const { limit, from } = req.query;

      const page = await this.service.getPage(from, limit);

      return success({
        res,
        message: "get API - list of profile",
        data: page,
        status: 200,
      });
    } catch (err) {
      console.error(`Error in profileGet:${err}`);
      return error(req, res, "Error getting list of profile");
    }
  }
  async update(req, res) {
    try {
      const { body } = req;

      const profileUpdated = await this.service.update(body);

      if (!profileUpdated) {
        return error({
          res,
          message: "profile not found",
          status: 404,
        });
      }

      return success({
        res,
        message: "profile updated",
        data: profileUpdated,
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

      const profileDeleted = await this.service.delete(id);

      if (!profileDeleted) {
        return error({
          res,
          message: "profile not found",
          status: 404,
        });
      }

      return success({
        res,
        message: "DELETE API - DELETE of profile for ID",
        data: profileDeleted,
        status: 200,
      });
    } catch (error) {
      console.error(`Error in profileDelete: ${error}`);
      return serverError({
        res,
        message: error.message,
        status: 500,
      });
    }
  }
}

module.exports = ProfileController;
