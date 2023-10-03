const Products = require('../models/products');
const Sale = require('../models/sale');
const User = require('../models/user')

const findById = async (id) => {
    const sale = await Sale.findById(id,
        ["status", "saleDate"])
        .populate({ path: 'clientId', select: "userName email role" })
        .populate({path: 'Info', select: 'email', populate: {path:'service', select: 'name'}})
        .populate({ path: 'sellerId', select: "userName email role" })
    return sale;
};

const newSale = async (body) => {
    const { status, saleDate, clientId, Info, sellerId } = body;

    const sale = new Sale({
        status,
        saleDate,
        Info: [Info],
        clientId: [clientId],
        sellerId: [sellerId],
    });

    const productUpdateResult = await Products.updateMany(
        
       
        { id: Info },
        { $set: { status: false } }
    );
    console.log('Sale updated:', productUpdateResult);
    console.log(productUpdateResult.id)
    const userSeller = await User.findById(sellerId);
    const userClient = await User.findById(clientId);

    sale.save();
    userSeller.sale.push(sale._id);
    userClient.product.push(Info);

    await Promise.all([userSeller.save(), userClient.save()]);

    const savedSale = await Sale.findById(sale._id);

    return savedSale;
};


const findByIdandUpdate = async ({ id, body }) => {
    const {
        status, saleDate, clientId, Info, sellerId
    } = body;

    const options = {
        status, saleDate, clientId, Info, sellerId
    };

    const updatedSale = await Sale.findByIdAndUpdate(
        { _id: id },
        { $set: options },
        { new: true }
    );

    const data = findById(updatedSale.id);

    return data;
};

const remove = async (id) => {

    const sale = await Sale.findById(id);

    if (!sale) return "no-sale"

    if (sale) {
        //PROBAR SI FUNCIONA !!!
        await User.deleteMany({sale: sale.id});
    }


    await sale.deleteOne()


    return sale.id
};

module.exports = {
    newSale,
    findById,
    findByIdandUpdate,
    remove
}