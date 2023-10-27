const UserService = require("./user.service");
const { generateJWT } = require("../middlewares/jwt.js");

class AuthService {
  constructor() {
    this.userService = new UserService();
    this.login = this.login.bind(this);
  }

  async login(loginDto) {
    const { password } = loginDto;

    try {
      const userFound = await this.userService.find(loginDto);
      if (!userFound) {
        throw new Error("User Not Found")
        
      }

      if (!userFound.active) {
        throw new Error("Email not active")
      }

      if (password !== userFound.password) {

       throw new Error("Incorrect password")
      }

      const token = await generateJWT(userFound.id);

      return {
        user: userFound,
        token
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthService;
