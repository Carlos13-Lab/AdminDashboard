const StreamingServiceRepository = require("../repository/streaming-service.repository");
const ProductService = require("./product.service");

class StreamingServiceService {
  constructor() {
    this.repository = new StreamingServiceRepository();
    this.productService = new ProductService();
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.getPage = this.getPage.bind(this);
  }
  async getById(id) {
    try {
      const service = await this.repository.findById(id);
      return service;
    } catch (error) {
      throw error;
    }
  }

  async create(streamingServiceDto) {
    try {
      const created = await this.repository.create(streamingServiceDto);
      return created;
    } catch (error) {
      throw error;
    }
  }

  async update(streamingServiceDto) {
    try {
      const update = await this.repository.update(streamingServiceDto);
      return update;
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
      const services = await this.repository.delete(id);

      if (!services) {
        throw new Error("StreamingServices not found");
      }

      const updateResult = await this.productService.unLinkStreamingService(id);

      console.log(`products affected: ${updateResult.modifiedCount}`);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = StreamingServiceService;
