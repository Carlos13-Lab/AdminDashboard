const ProfileRepository = require("../repository/profile.repository");
const ProductService = require("./product.service");

class ProfileService {
  constructor() {
    this.repository = new ProfileRepository();
    this.productService = new ProductService();
    this.findById = this.findById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.getPage = this.getPage.bind(this);
    this.delete = this.delete.bind(this);
  }
  async findById(id) {
    try {
      const profile = await this.repository.findById(id);
      return profile;
    } catch (error) {
      throw error;
    }
  }

  async create(profileDto) {
    try {
      const productFound = await this.productService.findById(
        profileDto.product
      );

      if (!productFound || productFound?.profiles?.length == 5) {
        throw new Error("No se pueden crear más perfiles para este producto");
      }

      const profileCreated = await this.repository.create(profileDto);

      productFound.profiles.push(profileCreated.id);
      await this.productService.update(productFound);

      return profileCreated;
    } catch (error) {
      throw error;
    }
  }
  async update(profileDto) {
    try {
      const profileUpdated = await this.repository.update(profileDto);
      return profileUpdated;
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
      const profileFound = await this.repository.findById(id);

      const productFound = await this.productService.findById(
        profileFound.product
      );
      if (productFound) {
        const profileFiltered = productFound.profiles.filter(
          (profile) => profile.id == id
        );
        productFound.profiles = profileFiltered;
        await this.productService.update(productFound);
      }
      return await this.repository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProfileService;
