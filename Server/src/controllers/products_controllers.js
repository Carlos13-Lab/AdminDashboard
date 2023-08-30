const { serverError, success , error} = require('../helpers/response.js');
const Products = require('../models/products.js');

const { newProducts, findByIdandUpdate, findById } = require('../services/products_service.js')


const Newproduct = async (req, res) => {
    const { body } = req;

    const { id } = req.params;

    let savedProducts = {};

    try {
        savedPost = await newProducts({ id, body });
        savedProducts = savedPost;
    } catch (err) {
        return serverError({
            res,
            message: err.message,
            status: 500
        });
    }
    
    return success({
        res,
        message: 'product creation successfully',
        data: savedProducts,
        status: 201
    });
}
const productsGet = async (req, res) => {
    let data = {}
    const { limit, from } = req.query;
    try {
        const [total, product] = await Promise.all([
            await Products.countDocuments(),
            await Products.find().skip(Number(from))
            .limit(Number(limit)).populate({path: 'service', select: 'name status'})
            .exec(),
        ]);
        data = {
            product,
            total,
        };
        return success({
            res,
            message: "get API - list of products",
            data,
            status: 201,
        });
    } catch (error) {
        console.error(`Error in productsGet:${error}`);
        return serverError({ 
            res, 
            message:"Error getting list of products",
            status: 400    
        });
    }
};


const productGetById = async (req, res) => {
    try {
        const { id } = req.params;
            const product = await findById(id)


        return success({
            res,
            message: "get API - list of products for ID",
            data: product,
            status: 201,
        });
    } catch (error) {
        console.error(`Error in productsGetById:${error}`);
        return serverError({
            res, 
            message:'Error getting products', 
            status: 500
        });
    }
};
const updatedProduct = async (req, res) => {
    const { id } = req.params;

    const { body } = req;

    let data = {};

    try {
        data = await findByIdandUpdate({ id, body });
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
            message: 'product updated',
            data,
            status: 201,
        });
    }

    return error({
        res,
        message: 'product not found',
        status: 404
    });
};


module.exports = {
    Newproduct,
    productsGet,
    productGetById,
    updatedProduct
}