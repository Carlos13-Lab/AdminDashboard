const Profiles = require('../models/profiles');
const Products = require('../models/products');

const findByIdProfile = async (id) => {
    const profile = await Profiles.findById(id, [
        "name",
        "status",
        "pin",
        "number"
    ]).populate({
        path: 'product',
        select: 'email'
    })
    return profile;
};

const newProfile = async ({ id, body }) => {
    const {
        pin,
        name,
        status,
        number,
    } = body;

    const profile = new Profiles({
        pin,
        name,
        status,
        number,
        product: []
    });
    await profile.save();
    const productIdAdd = await Products.findById(id)
    profile.product.push(productIdAdd.id);
    const savedProfile = await profile.save();


    return savedProfile

};

const findByIdandUpdate = async ({ id, body }) => {
    const {
        pin,
        name,
        status,
        number,
    } = body;

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

}

module.exports = {
    newProfile,
    findByIdProfile,
    findByIdandUpdate
}