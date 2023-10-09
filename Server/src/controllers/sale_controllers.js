const { serverError, success, error } = require('../helpers/response.js');
const Products = require('../models/products.js');
const Sale = require('../models/sale.js');
const User = require('../models/user.js');

const { newSale, findById, findByIdandUpdate } = require('../services/sale_service.js')

const saleNew = async (req, res) => {
    try {
        const { body } = req;
        const sale = await newSale(body);
        await sale.save();

        return success({
            res,
            message: "Sale created",
            data: sale,
            status: 200,
        });
    } catch (error) {
        console.log(error.message)
    }
};


const saleGet = async (req, res) => {
    const { limit, from } = req.query
    let data = {}
    try {
        const [total, sale] = await Promise.all([
            await Sale.countDocuments(),
            await Sale.find().skip(Number(from))
                .limit(Number(limit)).populate({ path: 'clientId', select: "userName email role" })
                .populate({ path: 'Info', select: 'email', populate: { path: 'service', select: 'name' } })
                .populate({ path: 'sellerId', select: "userName email role" })
                .exec(),
        ]);
        data = {
            sale,
            total,
        };
        return success({
            res,
            message: "get API - list of Sale",
            data,
            status: 201,
        });
    } catch (error) {
        console.error(`Error in SaleGet:${error}`);
        return serverError({
            res,
            message: "Error getting list of Sale",
            status: 400
        });
    }
};

const saleGetById = async (req, res) => {
    try {
        const { id } = req.params;
        const sale = await findById(id)

        return success({
            res,
            message: "get API - list of sale for ID",
            data: sale,
            status: 201,
        });
    } catch (error) {
        console.error(`Error in saleGetById:${error}`);
        return error(req, res, 'Error get sale');
    }
};

const updateSale = async (req, res) => {
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
            message: 'Sale updated',
            data,
            status: 201,
        });
    }

    return error({
        res,
        message: 'Sale not found',
        status: 404
    });
};

const saleDelete = async (req, res) => {
    try {
        const { id } = req.params;

        const sale = await Sale.findById(id);
        let sale__Past;
        const userSeller = await User.findById(sale.sellerId);
        const userClient = await User.findById(sale.clientId);
        const ProductInfo = await Products.findById(sale.Info);
        if (userSeller.sale.includes(sale.id)) {
            userSeller.sale = userSeller.sale.filter(saleId => saleId.toString() !== sale.id.toString());
        }
        if(userClient.product.includes(sale.Info)) {
            userClient.product = userClient.product.filter(InfoId => InfoId.toString() !== ProductInfo.id.toString())
        }
        ProductInfo.status = true;
        userClient.active = true;

        await Promise.all([userClient.save(),userSeller.save(), ProductInfo.save()]);

        sale__Past = await Sale.findByIdAndDelete(sale.id) 
        return res.status(201).json({
            message: "Sale deleted successfully",
            data: sale__Past,
        });
    } catch (error) {
        console.error(`Error in saleDelete: ${error}`);
        return res.status(500).json({ message: 'Error deleting the sale' });
    }
};






module.exports = {
    saleNew,
    saleGet,
    saleGetById,
    updateSale,
    saleDelete
};