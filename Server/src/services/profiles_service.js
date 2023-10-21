const Profiles = require("../models/profiles");
const { Product } = require("../models");

const findByIdProfile = async (id) => {
  const profile = await Profiles.findById(id, [
    "name",
    "status",
    "pin",
    "number",
  ]).populate({
    path: "product",
    select: "email",
  });
  return profile;
};

const newProfile = async ({ id, body }) => {
  const { pin, name, status, number } = body;

  const profile = new Profiles({
    pin,
    name,
    status,
    number,
    product: [],
  });
  await profile.save();
  const productIdAdd = await Product.findById(id);

  const profileCount = await Profiles.countDocuments({
    product: productIdAdd.id,
  });
  if (profileCount >= 5) {
    // Si ya existen cinco perfiles para el producto, devuelve un mensaje de error o realiza la acción correspondiente.
    return "No se pueden crear más perfiles para este producto";
  }
  profile.product.push(productIdAdd.id);
  const savedProfile = await profile.save();

  return savedProfile;
};

const findByIdandUpdate = async ({ id, body }) => {
  const { pin, name, status, number } = body;

  const options = {
    pin,
    name,
    status,
    number,
  };

  const updatedService = await Profiles.findByIdAndUpdate(
    { _id: id },
    { $set: options },
    { new: true }
  );

  const data = findByIdProfile(updatedService.id);

  return data;
};

module.exports = {
  newProfile,
  findByIdProfile,
  findByIdandUpdate,
};
