const { serverError, success, error } = require('../helpers/response.js');
const Sale = require('../models/sale.js');

const { newSale, findById, findByIdandUpdate, remove } = require('../services/sale_service.js')


const saleNew = async (req, res) => {
    let data = {};
    const { body } = req
    try {
        const savedSale = await newSale(body);
        await savedSale.save()

        data = {
            sale: savedSale,
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
        message: "sale created",
        data,
        status: 200,
    });

}

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

const SaleRemove = async (req, res) => {

    const { id } = req.params;


    try {
        const removeSale = await remove(id);
        if (!removeSale)
            return error({req, res, message:'There is a problem with the post that you want to remove!!', status:400});
        if (removeSale === "no-sale") return error({req, res, message:'There is a problem with the post that you want to remove!!', status:400});
        return success({req, res, message:'Sale deleted', data:removeSale, status:200});
    } catch (error) {
        if (error.message === 'no-privileges') {
            return error({req, res, message:'Unauthorized User', status:401});
        }

        return error({req, res, message:'Sale not found',status:500});
    }
};




module.exports = {
    saleNew,
    saleGet,
    saleGetById,
    updateSale,
    SaleRemove
};