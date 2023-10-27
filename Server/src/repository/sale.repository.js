const { Sale } = require("../models");

class SaleRepository {
  constructor() {
    this.findById = this.findById.bind(this);
    this.create = this.create.bind(this);
    this.findPaginated = this.findPaginated.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
  }

  async findById(id) {
    try {
      const sale = await Sale.findById(id, [
        "status",
        "saleDate",
        "finishDate",
        "price",
      ])
        .populate({ path: "client", select: "userName email role" })
        .populate({
          path: "product",
          select: "email",
          populate: { path: "streaming_service", select: "name" },
        })
        .populate({ path: "seller", select: "userName email role" });
      return sale;
    } catch (error) {
      throw error;
    }
  }

  async create(saleDto) {
    const sale = new Sale(saleDto);
    return await sale.save();
  }

  async update(saleDto) {
    const { id, status, saleDate, finishDate, price, client, seller, product } =
      saleDto;

    const options = {
      status,
      saleDate,
      finishDate,
      price,
      client,
      seller,
      product,
    };

    return await Sale.findByIdAndUpdate(
      { _id: id },
      { $set: options },
      { new: true }
    );
  }

  async findPaginated(from = 0, limit = 10) {
    const [total, saleList] = await Promise.all([
      await Sale.countDocuments(),
      await Sale.find().skip(Number(from)).limit(Number(limit)).exec(),
    ]);

    return {
      total,
      saleList,
    };
  }

  async delete(id) {
    return await Sale.findByIdAndDelete(id);
  }
}

module.exports = SaleRepository;
