const { StreamingServiceModel } = require("../models");

class StreamingServiceRepository {
  constructor() {
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.findPaginated = this.findPaginated.bind(this);
    this.findById = this.findById.bind(this);
  }

  async findById(id) {
    const service = await StreamingServiceModel.findById(id, [
      "name",
      "status",
    ]);
    return service;
  }

  async findPaginated(from = 0, limit = 10) {
    const [total, service] = await Promise.all([
      await StreamingServiceModel.countDocuments(),
      await StreamingServiceModel.find()
        .skip(Number(from))
        .limit(Number(limit))
        .exec(),
    ]);

    return {
      total,
      service,
    };
  }

  async create(streamingServiceDto) {
    const { name, status } = streamingServiceDto;

    const service = new StreamingServiceModel({
      name,
      status,
    });

    return await service.save();
  }

  async update(streamingServiceDto) {
    const { name, status } = streamingServiceDto;

    const options = {
      status,
      name,
    };

    return await StreamingServiceModel.findByIdAndUpdate(
      { _id: streamingServiceDto.id },
      { $set: options },
      { new: true }
    );
  }

  async delete(id) {
    return await StreamingServiceModel.findByIdAndDelete(id);
  }
}

module.exports = StreamingServiceRepository;
