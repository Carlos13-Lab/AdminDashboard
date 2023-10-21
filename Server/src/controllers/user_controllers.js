const { serverError, success, error } = require("../helpers/response.js");
const { findById, findByIdSeller } = require('../services/user_service.js')
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs')

const User = require('../models/user.js');
const Product = require('../models');
const Sale = require('../models/sale.js')


const UserNew = async (req, res) => {
    try {
        const { userName, email, password, role, phone_Number, active, product } = req.body;

        const user = new User({
            userName,
            email,
            password,
            role,
            phone_Number,
            active,
            product: []
        });

        if (product && user.role === 'client') {
            const productIds = [...new Set(product)];

            for (let productId of productIds) {
                try {
                    if (mongoose.Types.ObjectId.isValid(productId)) {
                        const productObj = await Product.findById(productId);
                        if (productObj) {                
                            user.product.push(productId);
                        }
                    }
                } catch (error) {
                    console.error(`Error finding product: ${error}`);
                }
            }
        }

        await user.save();

        return res.status(200).json({
            message: 'User created',
            data: { user }
        });
    } catch (error) {
        console.error(`Error in userPost: ${error}`);
        return res.status(500).json({
            error: 'Error creating a user'
        });
    }
};

const userGet = async (req, res) => {
    let data = {}
    const { limit, from } = req.query;
    try {
        const [totalResult, userResult] = await Promise.allSettled([
            User.countDocuments(),
            User.find().skip(Number(from)).limit(Number(limit))
                .populate([
                    {
                        path: 'product', select: 'email', populate: {
                            path: 'service', select: 'name'
                        }
                    }])
                .exec(),
        ]);

        if (totalResult.status === 'fulfilled' && userResult.status === 'fulfilled') {
            const { value: total } = totalResult;
            const { value: user } = userResult;

            data = {
                user,
                total,
            };

            return success({
                res,
                message: "get API - list user",
                data,
                status: 200,
            });
        } else {
            const error = totalResult.reason || userResult.reason;
            return serverError({
                res,
                message: `Error in userGet: ${error}`,
                data,
                status: 500,
            });
        }
    } catch (error) {
        return serverError({
            res,
            message: `Error in userGet: ${error}`,
            data,
            status: 500,
        });
    }
};


const userGetById = async (req, res) => {
    try {
        const { id } = req.params;
        let user = await findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role === 'seller') {
            user = await findByIdSeller(id);
        }

        return success({
            res,
            message: "get API - list of user for ID",
            data: user,
            status: 201,
        });
    } catch (error) {
        console.error(`Error in userGetById:${error}`);
        return serverError({
            res,
            message: `Error in userGet: ${error}`,
            status: 500,
        });
    }
};

// Function to generate a random email
function generateRandomEmail() {
    const randomString = Math.random().toString(36).substring(2, 15);
    return `${randomString}@example.com`;
}

const UserNewClient = async (req, res) => {
    try {
        const { userName, phone_Number, active, product } = req.body;
        const randomEmail = generateRandomEmail();

        const user = new User({
            userName,
            email: randomEmail,
            role: 'client',
            phone_Number,
            active,
            product: []
        });

        if (product && user.role === 'client') {
            const productIds = [...new Set(product)];

            for (let productId of productIds) {
                try {
                    if (mongoose.Types.ObjectId.isValid(productId)) {
                        const productObj = await Product.findById(productId);
                        if (productObj) {                
                            user.product.push(productId);
                        }
                    }
                } catch (error) {
                    console.error(`Error finding product: ${error}`);
                }
            }
        }

        await user.save();

        return res.status(200).json({
            message: 'User created',
            data: { user }
        });
    } catch (error) {
        console.error(`Error in userPost: ${error}`);
        return res.status(500).json({
            error: 'Error creating a user'
        });
    }
};


const userDelete = async (req, res) => {
    const { id } = req.params;

    try {
        const user_past = await User.findById(id);
        let user;

        if (user_past.role === "seller" && user_past.sale) {
            await Promise.all(
                user_past.sale.map(async (saleId) => {
                    const sale = await Sale.findByIdAndDelete(saleId);
                    if (sale) {
                        console.log(`Sale ${saleId} deleted`);
                    }
                })
            );
        }

        user = await User.findByIdAndDelete(user_past._id);

        return res.status(201).json({
            message: "User Delete success",
            data: user,
        });
    } catch (error) {
        console.error(`Error in userDelete:${error}`);
        return res.status(500).json({ message: 'Error deleting a user' });
    }
};

const UpdateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { password, role, product, ...rest } = req.body;

        if (password) {
            const salt = bcryptjs.genSaltSync(10);
            rest.password = bcryptjs.hashSync(password, salt);
        }

        const userPast = await User.findById(id);

        if (userPast.role === 'admin') {
            rest.product = [];
        } else {
            // Verifica si el producto ya existe antes de agregarlo
            if (product) {
                const existingProducts = userPast.product;
                const newProducts = product.filter(p => !existingProducts.includes(p));
                rest.product = [...existingProducts, ...newProducts];
            } else {
                rest.product = userPast.product;
            }
        }

        const user = await User.findByIdAndUpdate(id, { product: rest.product, ...rest }, { new: true });

        return res.status(200).json({ message: 'User updated', user });
    } catch (error) {
        console.error(`Error in UpdateUser: ${error}`);
        return res.status(500).json({ error: 'Error updating a user' });
    }
};




module.exports = {
    UpdateUser,
    userGet,
    userGetById,
    UserNew,
    userDelete,
    UserNewClient
}