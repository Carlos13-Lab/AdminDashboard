const { serverError, success, error } = require("../helpers/response.js");
const { findById, findByIdSeller } = require("../services/user.service.js");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const User = require("../models/index.js");
const Product = require("../models/index.js");
const Sale = require("../models/sale.js");
const UserService = require("../services/user.service.js");

class UserController {
  constructor() {
    this.service = new UserService();
    this.find = this.find.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
    this.getUsers = this.getUsers.bind(this)
  }

  async find(req, res) {
    try {
      const { body } = req;
      const userFound = await this.service.find(body);

      return success({
        res,
        message: "get API - list of user for ID",
        data: userFound,
        status: 201,
      });
    } catch (error) {
      console.error(`Error in userGetById:${error}`);
      return serverError({
        res,
        message: `Error in userGet: ${error}`,
        status: 400,
      });
    }
  }

  async create(req, res) {
    try {
      const { body } = req;
      const userCreated = await this.service.create(body);

      return success({
        res,
        message: "User created",
        data: userCreated,
        status: 201,
      });
    } catch (err) {
      console.log(error(`Error in userPost: ${err}`));
      return serverError({
        res,
        message: "Error creating a user",
        status: 500,
      });
    }
  }

  async update(req, res) {
    try {
      const { body } = req;

      const userUpdated = await this.service.update(body);

      if (!userUpdated) {
        return error({
          res,
          message: "user not found",
          status: 404,
        });
      }

      return success({
        res,
        message: "user updated",
        data: userUpdated,
        status: 202,
      });
    } catch (err) {
      return serverError({
        res,
        message: err.message,
        status: 500,
      });
    }
  }

  async getUsers(req, res) {
    try {
      const { limit, from } = req.query;

      const page = await this.service.getPage(from, limit);

      return success({
        res,
        message: "get API - list of Users",
        data: page,
        status: 200,
      });
    } catch (err) {
      console.error(`Error in usersGet:${err}`);
      return error(req, res, "Error getting list of Users");
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const userDelete = await this.service.delete(id);

      if (!userDelete) {
        return error({
          res,
          message: "users not found",
          status: 404,
        });
      }

      return success({
        res,
        message: "DELETE API - DELETE of user for ID",
        data: userDelete,
        status: 200,
      });
    } catch (error) {
      console.error(`Error in userDelete: ${error}`);
      return serverError({
        res,
        message: error.message,
        status: 500,
      });
    }
  }
}
// const UserNew = async (req, res) => {
//   try {
//     const { userName, email, password, role, phone_Number, active } = req.body;

//     const user = new User({
//       userName,
//       email,
//       password,
//       role,
//       phone_Number,
//       active,
//     });

//     await user.save();

//     return res.status(200).json({
//       message: "User created",
//       data: { user },
//     });
//   } catch (error) {
//     console.error(`Error in userPost: ${error}`);
//     return res.status(500).json({
//       error: "Error creating a user",
//     });
//   }
// };

// const userGet = async (req, res) => {
//   let data = {};
//   const { limit, from } = req.query;
//   try {
//     const [user, total] = await Promise.allSettled([
//       User.countDocuments(),
//       User.find()
//         .skip(Number(from))
//         .limit(Number(limit))
//         .populate([
//           {
//             path: "product",
//             select: "email",
//             populate: {
//               path: "service",
//               select: "name",
//             },
//           },
//         ])
//         .exec(),
//     ]);
//     data = {
//       user,
//       total,
//     };

//     return success({
//       res,
//       message: "get API - list user",
//       data,
//       status: 200,
//     });
//   } catch (error) {
//     return serverError({
//       res,
//       message: `Error in userGet: ${error}`,
//       data,
//       status: 500,
//     });
//   }
// };

// const userGetById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     let user = await findById(id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (user.role === "seller") {
//       user = await findByIdSeller(id);
//     }

//     return success({
//       res,
//       message: "get API - list of user for ID",
//       data: user,
//       status: 201,
//     });
//   } catch (error) {
//     console.error(`Error in userGetById:${error}`);
//     return serverError({
//       res,
//       message: `Error in userGet: ${error}`,
//       status: 500,
//     });
//   }
// };

// // Function to generate a random email
// function generateRandomEmail() {
//   const randomString = Math.random().toString(36).substring(2, 15);
//   return `${randomString}@example.com`;
// }

// const UserNewClient = async (req, res) => {
//   try {
//     const { userName, phone_Number, active, product } = req.body;
//     const randomEmail = generateRandomEmail();

//     const user = new User({
//       userName,
//       email: randomEmail,
//       role: "client",
//       phone_Number,
//       active,
//       product: [],
//     });

//     // if (product && user.role === 'client') {
//     //     const productIds = [...new Set(product)];

//     //     for (let productId of productIds) {
//     //         try {
//     //             if (mongoose.Types.ObjectId.isValid(productId)) {
//     //                 const productObj = await Product.findById(productId);
//     //                 if (productObj) {
//     //                     user.product.push(productId);
//     //                 }
//     //             }
//     //         } catch (error) {
//     //             console.error(`Error finding product: ${error}`);
//     //         }
//     //     }
//     // }

//     await user.save();

//     return res.status(200).json({
//       message: "User created",
//       data: { user },
//     });
//   } catch (error) {
//     console.error(`Error in userPost: ${error}`);
//     return res.status(500).json({
//       error: "Error creating a user",
//     });
//   }
// };

// const userDelete = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const user_past = await User.findById(id);
//     let user;

//     if (user_past.role === "seller" && user_past.sale) {
//       await Promise.all(
//         user_past.sale.map(async (saleId) => {
//           const sale = await Sale.findByIdAndDelete(saleId);
//           if (sale) {
//             console.log(`Sale ${saleId} deleted`);
//           }
//         })
//       );
//     }

//     user = await User.findByIdAndDelete(user_past._id);

//     return res.status(201).json({
//       message: "User Delete success",
//       data: user,
//     });
//   } catch (error) {
//     console.error(`Error in userDelete:${error}`);
//     return res.status(500).json({ message: "Error deleting a user" });
//   }
// };

// const UpdateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { password, role, product, ...rest } = req.body;

//     if (password) {
//       const salt = bcryptjs.genSaltSync(10);
//       rest.password = bcryptjs.hashSync(password, salt);
//     }

//     const userPast = await User.findById(id);

//     if (userPast.role === "admin") {
//       rest.product = [];
//     } else {
//       // Verifica si el producto ya existe antes de agregarlo
//       if (product) {
//         const existingProducts = userPast.product;
//         const newProducts = product.filter(
//           (p) => !existingProducts.includes(p)
//         );
//         rest.product = [...existingProducts, ...newProducts];
//       } else {
//         rest.product = userPast.product;
//       }
//     }

//     const user = await User.findByIdAndUpdate(
//       id,
//       { product: rest.product, ...rest },
//       { new: true }
//     );

//     return res.status(200).json({ message: "User updated", user });
//   } catch (error) {
//     console.error(`Error in UpdateUser: ${error}`);
//     return res.status(500).json({ error: "Error updating a user" });
//   }
// };

module.exports = UserController;
