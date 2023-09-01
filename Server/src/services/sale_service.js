const Sale = require('../models/sale');

const findById = async (id) => {
    const sale = await Sale.findById(id,
        ["status", "saleDate"])
        .populate({ path: 'clientId', select: "userName email role" })
        .populate({path: 'Info', select: 'email', populate: {path:'service', select: 'name'}})
        .populate({ path: 'sellerId', select: "userName email role" })
    return sale;
};

const newSale = async (body) => {
    const { status, saleDate,clientId, Info, sellerId} = body;

    const sale = new Sale({
        status, saleDate, Info: [], clientId: [], sellerId: []
    });
    sale.sellerId.push(sellerId)
    sale.clientId.push(clientId)
    sale.Info.push(Info)
    await sale.save();
    const savedSale = await findById(sale._id);

    return savedSale;
};


module.exports = {
    newSale,
    findById
}