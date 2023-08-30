const { serverError, success, error } = require("../helpers/response.js");
const { UpdateUser, findById, newUser } = require('../services/user_service.js')

const User = require('../models/user.js');
const Product = require('../models/products.js');


const userfindUpdate = async (req, res) => {
    const { id } = req.params;

    const { body } = req;

    let data = {};

    try {
        data = await UpdateUser({ id, body });
    } catch (err) {
        return serverError({
            res,
            message: err.message,
            status: 500
        });
    }

    if (Object.keys(data).length > 0) {
        return success({
            res,
            message: 'User updated',
            data,
            status: 201,
        });
    }

    return error({
        res,
        message: 'User not found',
        status: 404
    });
};
const UserNew = async (req, res) => {
    let data = {};
     const {id} = req.params
    try {
        const savedUser = await newUser(req.body);
        const ProductUser = await Product.findById(id);
        savedUser.product.push(ProductUser.id);
        await savedUser.save()
        
        data = {
            user: savedUser,
        };
    } catch (error) {
        return serverError({
            res,
            message: error.message,
            status: 500
        });
    }

    return success({
        res,
        message: "user created",
        data,
        status: 200,
    });
};

const userGet = async (req, res) => {
    let data = {}
    const { limit, from } = req.query;
    try {
        const [total, user] = await Promise.all([
            await User.countDocuments(),
            await User.find().skip(Number(from)).limit(Number(limit))
            .populate([
                {path: 'product', select: 'email',populate:{
                path: 'service', select: 'name'
            }}])
            .exec(),
        ]);
        data = {
            user,
            total,
        };
        return success({
            res,
            message: "get API - list user",
            data,
            status: 201,
        });
    } catch (error) {
        console.error(`Error in userGet:${error}`);
        return serverError({
            res,
            message: "Error getting list of user",
            data,
            status: 500,
        });
    }
};

const userGetById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await findById(id)

        return success({
            res,
            message: "get API - list of user for ID",
            data: user,
            status: 201,
        });
    } catch (error) {
        console.error(`Error in userGetById:${error}`);
        return error(req, res, 'Error get user');
    }
};


const addIdProductClient = async (req, res) => {
    const { id } = req.params;
    const { p_id} = req.body;
    try {
        const user = await User.findById(id);
        user.product.push(p_id)
        await user.save();
        return success({
            res,
            message: "user Add success",
            data: user,
            status: 201
        });
    } catch (error) {
        console.error(`Error in User:${error}`);
        return serverError({
            res,
            message: "Error getting list of user",
            status: 500,
        });
    }
};

module.exports = {
    userfindUpdate,
    userGet,
    userGetById, 
    UserNew,
    addIdProductClient
}