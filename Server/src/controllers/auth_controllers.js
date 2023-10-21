const { serverError, success } = require("../helpers/response.js");
// const {comparePassword} = require('../helpers/crypto.js')
const { generateJWT } = require("../middlewares/jwt.js");

const { NewUser, findByEmail } = require("../services/user_service.js");

const Register = async (req, res) => {
  let data = {};

  try {
    const savedUser = await NewUser(req.body);

    const token = await generateJWT({
      id: savedUser.id,
      userName: savedUser.userName,
      role: savedUser.role,
    });

    data = {
      user: savedUser,
      token,
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

  let user = {};

  try {
    user = await findByEmail(email);
  } catch (err) {
    return serverError({
      res,
      message: err.message,
    });
  }

  // const { password: userPassword, ...userWithoutPassword } = user.toObject();

  // const validPassword = comparePassword(password, userPassword);

  if (password) {
    let token = "";
    try {
      token = await generateJWT({id: user.id, role: user.role});
    } catch (err) {
      return serverError({
        res,
        message: err.message,
      });
    }

    return success({
      res,
      message: "successfull login",
      data: { user, token },
      status: 200,
    });
  }
  return error({
    res,
    message: "invalid password",
    status: 401,
  });
};

module.exports = {
  Register,
  Login,
};
