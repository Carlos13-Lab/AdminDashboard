const { Product } = require("../models");

class ProductRepository {
  constructor() {
    this.create = this.create.bind(this);
    this.findById = this.findById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async findById(id) {
    const product = await Product.findById(id, [
      "email",
      "password",
      "status",
    ]).populate({
      path: "streaming_service",
      select: "name",
    });
    return product;
  }

  async create(productDto) {
    const product = new Product(productDto);
    return await product.save();
  }

  async update(productDto) {
    const { email, password, status } = productDto;

    const options = {
      email,
      password,
      status,
    };

    return await Product.findByIdAndUpdate(
      { _id: id },
      { $set: options },
      { new: true }
    );
  }

  async delete(id) {
    return await Product.findByIdAndDelete(id);
  }

  async findPaginated(from = 0, limit = 10) {
    const [total, productList] = await Promise.all([
      await Product.countDocuments(),
      await Product.find().skip(Number(from)).limit(Number(limit)).exec(),
    ]);

    return {
      total,
      productList,
    };
  }

  async unLinkStreamingService(streamingServiceId) {
    const updateResult = await Product.updateMany(    
      { streaming_service: streamingServiceId.id },
      {
        $unset: { Info: 1 },
        $set: { status: false },
      });

    return updateResult;
  }
}

module.exports = ProductRepository;
