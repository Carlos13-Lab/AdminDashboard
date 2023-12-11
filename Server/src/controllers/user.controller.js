const { serverError, success, error } = require("../helpers/response.js");
const UserService = require("../services/user.service.js");

class UserController {
  constructor() {
    this.service = new UserService();
    this.find = this.find.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
    this.getUsers = this.getUsers.bind(this);
  }

  async find(req, res) {
    try {
      const { body } = req;
      const userFound = await this.service.find(body);

      if (!userFound) {
        return serverError({
          res,
          message: `user not found`,
          status: 404,
        });
      }

      return success({
        res,
        message: "get API - list of user for ID",
        data: userFound,
        status: 200,
      });
    } catch (error) {
      console.error(`Error in userGetById:${error}`);
      return serverError({
        res,
        message: `Error in userGet: ${error}`,
        status: 400,
      });
    }
  }

  async create(req, res) {
    try {
      const { body } = req;
      const userCreated = await this.service.create(body);

      return success({
        res,
        message: "User created",
        data: userCreated,
        status: 201,
      });
    } catch (err) {
  
      return serverError({
        res,
        message: "Error creating a user",
        status: 500,
      });
    }
  }

  async update(req, res) {
    try {
      const { body } = req;

      const userUpdated = await this.service.update(body);

      if (!userUpdated) {
        return error({
          res,
          message: "user not found",
          status: 404,
        });
      }

      return success({
        res,
        message: "user updated",
        data: userUpdated,
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

  async getUsers(req, res) {
    try {
      const { limit, from } = req.query;

      const page = await this.service.getPage(from, limit);

      return success({
        res,
        message: "get API - list of Users",
        data: page,
        status: 200,
      });
    } catch (err) {
      console.error(`Error in usersGet:${err}`);
      return error(req, res, "Error getting list of Users");
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const userDelete = await this.service.delete(id);

      if (!userDelete) {
        return error({
          res,
          message: "users not found",
          status: 404,
        });
      }

      return success({
        res,
        message: "DELETE API - DELETE of user for ID",
        data: userDelete,
        status: 200,
      });
    } catch (error) {
      console.error(`Error in userDelete: ${error}`);
      return serverError({
        res,
        message: error.message,
        status: 500,
      });
    }
  }
}

module.exports = UserController;
