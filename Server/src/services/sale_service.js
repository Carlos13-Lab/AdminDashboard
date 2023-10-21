const Products = require("../models/products");
const Sale = require("../models/sale");
const User = require("../models/user");

const findById = async (id) => {
  const sale = await Sale.findById(id, ["status", "saleDate"])
    .populate({ path: "clientId", select: "userName email role" })
    .populate({
      path: "Info",
      select: "email",
      populate: { path: "streaming_service", select: "name" },
    })
    .populate({ path: "sellerId", select: "userName email role" });
  return sale;
};

const newSale = async (body) => {
  try {
    const {
      status,
      saleDate,
      clientId,
      Info,
      sellerId,
      price,
      finishDate,
      serviceId,
    } = body;

    const sale = new Sale({
      status,
      saleDate,
      finishDate,
      Info: [Info],
      clientId: [clientId],
      sellerId: [sellerId],
      price,
      serviceId,
    });

    const [userSeller, userClient, info] = await Promise.all([
      User.findById(sellerId),
      User.findById(clientId),
      Products.findById(Info),
    ]);

    await Promise.all([info.save(), sale.save()]);
    console.log(userSeller.sale);

    userSeller.sale.push(sale.id);

    userClient.product.push(Info);

    await Promise.all([userSeller.save(), userClient.save()]);
    const savedSale = await Sale.findById(sale.id);

    return savedSale;
  } catch (error) {
    console.error(`Error in newSale: ${error.message}`);
    throw new Error("Error creating new sale");
  }
};

const findByIdandUpdate = async ({ id, body }) => {
  const { status, saleDate, price } = body;

  const options = {
    status,
    saleDate,
    price,
  };

  const updatedSale = await Sale.findByIdAndUpdate(
    { _id: id },
    { $set: options },
    { new: true }
  );

  const data = findById(updatedSale.id);

  return data;
};

module.exports = {
  newSale,
  findById,
  findByIdandUpdate,
};
