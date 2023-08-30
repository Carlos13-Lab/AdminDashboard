const Services = require('../models/Streamingservices');

const findByIdServices = async (id) => {
    const service = await Services.findById(id, [
        'name',
        'status'
    ])
    return service;
};

const newServices = async (body) => {
    const { name,
        status } = body;

    const service = new Services({
        name,
        status
    });

    await service.save();

    const savedServices = await findByIdServices(service._id);

    return savedServices;
};

const findByIdandUpdate = async ({ id, body }) => {
    const {
        name,
        status,
    } = body;

    const options = {
        status,
        name
    };

    const updatedService = await Services.findByIdAndUpdate(
        { _id: id },
        { $set: options },
        { new: true }
    );

    const data = findByIdServices(updatedService.id);

    return data;
};



module.exports = { newServices, findByIdandUpdate, findByIdServices };