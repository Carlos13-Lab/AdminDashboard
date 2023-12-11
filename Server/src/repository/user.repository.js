const { User } = require("../models");

class UserRepository {
  constructor() {
    this.findById = this.findById.bind(this);
    this.create = this.create.bind(this);
    this.findPaginated = this.findPaginated.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
  }

  async findById(id) {
    try {
      const user = await User.findById(id, [
        "userName",
        "email",
        "phone_Number",
        "role",
        "active",
      ]).populate({ path: "product", select: "email" })
        .populate([
        {
          path: "sale",
          select: "saleDate",
          populate: [
            {
              path: "client",
              select: "userName email role",
            },
            {
              path: "product",
              select: "email",
              populate: {
                path: "streaming_service",
                select: "name",
              },
            },
          ],
        },
      ]);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email) {
    try {
      const user = await User.findOne({ email }, [
        "userName",
        "email",
        "phone_Number",
        "role",
        "active",
        "password"
      ]).populate({
        path: "sale",
        select: "saleDate",
        populate: [
          {
            path: "client",
            select: "userName email role",
            populate: {
              path: "user",
              select: "userName email role",
            },
          },
          {
            path: "product",
            select: "email",
            populate: {
              path: "streaming_service",
              select: "name",
            },
          },
        ],
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async findPaginated(from = 0, limit ) {
    try {
      const [total, user] = await Promise.all([
        User.countDocuments(),
        User.find()
          .skip(Number(from))
          .limit(Number(limit))
          .populate([
            {
              path: "product",
              select: "email",
              populate: {
                path: "streaming_service",
                select: "name",
              },
            },
          ])
          .populate({ path: "sale", select: "saleDate finishDate status" })
          .exec(),
        ]);
        return { total, user };
    } catch (error) {
      throw error;
    }
  }

  async create(userDto) {
    try {
      const userCreated = new User(userDto);
      return userCreated.save();
    } catch (error) {
      throw error;
    }
  }

  async update(userDto) {
    const { id, password, product, email, sale, userName, phone_Number, active} = userDto;

    const options = {
      password,
      product,
      email,
      sale,
      phone_Number,
      userName,
      active,
    };

    return await User.findByIdAndUpdate(
      { _id: id },
      { $set: options },
      { new: true }
    );
  }

  async delete(id) {
    return await User.findByIdAndDelete(id);
  }
}

module.exports = UserRepository;
