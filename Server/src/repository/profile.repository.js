const { Profile } = require("../models");

class ProfileRepository {
  constructor() {
    this.findById = this.findById.bind(this);
    this.create = this.create.bind(this);
    this.findPaginated = this.findPaginated.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
  }
  async findById(id) {
    const profile = await Profile.findById(id, [
      "name",
      "status",
      "pin",
      "number",
    ]).populate({
      path: "product",
      select: "email",
    });
    return profile;
  }
  async create(profileDto) {
    const profile = new Profile(profileDto);
    return await profile.save();
  }

  async update(profileDto) {
    const {id, name, status, pin, number } = profileDto;

    const options = {
      name,
      status,
      pin,
      number,
    };

    return await Profile.findByIdAndUpdate(
      { _id: id },
      { $set: options },
      { new: true }
    );
  }

  async findPaginated(from = 0, limit = 10) {
    const [total, profileList] = await Promise.all([
      await Profile.countDocuments(),
      await Profile.find().skip(Number(from)).limit(Number(limit)).exec(),
    ]);

    return {
      total,
      profileList,
    };
  }

  async delete(id) {
    return await Profile.findByIdAndDelete(id);
  }
}

module.exports = ProfileRepository;
