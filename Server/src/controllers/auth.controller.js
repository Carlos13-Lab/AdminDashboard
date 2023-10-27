const { serverError, success, error } = require("../helpers/response.js");
const AuthService = require("../services/Auth.service.js");

class AuthController {
  constructor() {
    this.service = new AuthService();
    this.login = this.login.bind(this);
  }

  async login(req, res) {
    try {
      const { body } = req;

      const loginData = await this.service.login(body)

      return success({
        res,
        message: "Successful login",
        data: loginData, 
        status: 200,
      });
    } catch (error) {
      return serverError({
        res,
        message: "invalid not login",
        status: 400,
      });
    }
  }
}


module.exports = AuthController;
