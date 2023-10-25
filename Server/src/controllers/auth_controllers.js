const { serverError, success , error} = require("../helpers/response.js");
const bcryptjs = require('bcryptjs');
const { generateJWT } = require("../middlewares/jwt.js");
const User = require("../models");

const { NewUser } = require("../services/user_service.js");

const Register = async (req, res) => {
  let data = {};

  try {
    const savedUser = await NewUser(req.body);

    data = {
      user: savedUser
    };
  } catch (err) {
    return serverError({
      res,
      message: err.message,
      status: 500,
    });
  }

  return success({
    res,
    message: "user created",
    data,
    status: 201,
  });
};
const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return error({ res, message: "Incorrect email", status: 400 });
    }

    if (!user.active) {
      return error({ res, message: "Email not active", status: 400 });
    }

    if (password !== user.password) {
      return error({ res, message: "Incorrect password", status: 400 });
    }

    const token = await generateJWT(user.id);

    return success({
      res,
      message: "Successful login",
      data: { user, token },
      status: 200,
    });
  } catch (error) {
    return serverError({
      res,
      message: "Invalid password",
      status: 401,
    });
  }
};



module.exports = {
  Register,
  Login,
};
