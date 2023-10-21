const ProductRepository = require("../repository/product.respository");

class ProductService {
  constructor() {
    this.repository = new ProductRepository();
    this.findById = this.findById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.getPage = this.getPage.bind(this);
    this.delete = this.delete.bind(this)
  }

  async findById(id) {
    try {
      const product = await this.repository.findById(id);
      return product;
    } catch (error) {
      throw error;
    }
  }
  async create(productDto) {
    try {
      const product = await this.repository.create(productDto);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async update(productDto) {
    try {
      const productUpdated = await this.repository.update(productDto);
      return productUpdated;
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

  async unLinkStreamingService(streamingServiceId) {
    try {
      return await this.repository.unLinkStreamingService(streamingServiceId);
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try{ 
      return this.repository.delete(id)
    } catch(error) {

    }
  }
}

module.exports = ProductService;
