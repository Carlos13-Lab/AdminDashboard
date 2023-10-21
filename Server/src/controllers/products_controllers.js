const { serverError, success , error} = require('../helpers/response.js');
const { newProducts, findById } = require('../services/product.service.js');
const Sale = require('../models/sale.js');
const Profiles = require('../models/profiles.js');
const { Product } = require("../models");
const User = require('../models/user.js')


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
            await Product.countDocuments(),
            await Product.find().skip(Number(from))
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
    try {
        const { id } = req.params;
        const { service, ...rest } = req.body;

        const productPast = await Product.findById(id);

        // Dejar todo como estaba si no se selecciona nada
        if (!service) {
            rest.service = productPast.service;
        } else {
            rest.service = service;
        }

        const product = await Product.findByIdAndUpdate(id, { service: rest.service, ...rest }, { new: true });

        return res.status(200).json({ message: 'product updated', product });
    } catch (error) {
        console.error(`Error in Updateproduct: ${error}`);
        return res.status(500).json({ error: 'Error updating a product' });
    }
};



const productDelete = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const saleUpdateResult = await Sale.updateMany(
            { 'Info': product.id },
            {
                $unset: { Info: 1 },
                $set: { status: false }
            }
        );
        console.log('Sale updated:', saleUpdateResult);

        const profilesDeletedPast = await Profiles.findOneAndDelete({ 'product': product.id });
        console.log('Profiles deleted:', profilesDeletedPast);

        const usersUpdateResult = await User.updateMany(
            { 'product': product.id },
            { $unset: { product: 1 } }
        );
        console.log('Users updated:', usersUpdateResult);

        return res.status(201).json({
            message: "Product deleted successfully",
            data: product,
        });
    } catch (error) {
        console.error(`Error in productDelete: ${error}`);
        return res.status(500).json({ message: 'Error deleting the product' });
    }
};



module.exports = {
    Newproduct,
    productsGet,
    productGetById,
    updatedProduct,
    productDelete
}