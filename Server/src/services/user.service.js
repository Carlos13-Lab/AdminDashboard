
const UserRepository = require("../repository/user.repository");
class UserService {
  constructor() {
    this.repository = new UserRepository();
    this.findById = this.find.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.getPage = this.getPage.bind(this)
    this.delete = this.delete.bind(this)
  }

  async find(userDto) {
    try {
      if (userDto.email) {
        return await this.repository.findByEmail(userDto.email);
      }
      if (userDto.id && userDto.role == "seller") {
        return await this.repository.findSellerById(userDto.id);
      }
      if (userDto.id) {
        return await this.repository.findById(userDto.id);
      }
      throw new Error("UserDto fail for data");
    } catch (error) {
      throw error;
    }
  }

  async create(userDto) {
    try {
      return await this.repository.create(userDto);
    } catch (error) {
      throw error;
    }
  }

  async update(userDto) {
    try {
      return await this.repository.update(userDto);
    } catch (error) {
      throw error;
    }
  }

  async getPage(page, quantity) {
    try {
      return await this.repository.findPaginated(page, quantity);
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const userDeleted = await this.repository.delete(id);

      if (!userDeleted) {
        throw new Error("User not found");
      }
      //TODO: Sale Delete
      

    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
