const { serverError, success, error } = require("../helpers/response.js");
const Services = require("../models/Streamingservices.js");
const Products = require("../models/products.js")

const { newServices , findByIdandUpdate, findByIdServices} = require("../services/services_service.js");

const servicesGet = async (req, res) => {
  let data = {}
  const { limit, from } = req.query;
  try {
    const [total, service] = await Promise.all([
      await Services.countDocuments(),
      await Services.find().skip(Number(from)).limit(Number(limit)).exec(),
    ]);
    data = {
      service,
      total,
    };
    return success({
      res,
      message: "get API - list of service",
      data,
      status: 201,
    });
  } catch (error) {
    console.error(`Error in serviceGet:${error}`);
    return error(req, res, "Error getting list of service");
  }
};

const NewService = async (req, res) => {
  let data = {};
  try {
    const savedServices = await newServices(req.body);
    data = {
      service: savedServices,
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
    message: "service created",
    data,
    status: 200,
  });
};
const serviceGetById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await findByIdServices(id)
  
    return success({
      res,
      message: "get API - list of service for ID",
      data: service,
      status: 201,
    });
  } catch (error) {
    console.error(`Error in serviceGetById:${error}`);
    return error(req, res, 'Error getting service');
  }
};
const updateServices = async (req, res) => {
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
      message: 'services updated',
      data,
      status: 201,
    });
  }

  return error({
    res,
    message: 'services not found',
    status: 404
  });
};

const ServicesDelete = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const services = await Services.findByIdAndDelete(id);

    if (!services) {
      return res.status(404).json({ message: 'Services not found' });
    }

    const UpdateResult = await Products.updateMany(
      { 'service': services.id },
      {
        $unset: { Info: 1 },
        $set: { status: false }
      }
    );
    console.log('Sale updated:', UpdateResult);

    return success({
      res,
      message: "DELETE API - DELETE of service for ID",
      data: services,
      status: 201,
    });

  } catch (error) {
    console.error(`Error in ServicesDelete: ${error}`);
    return res.status(500).json({ message: 'Error deleting the Services' });
  }
};


module.exports = {
  NewService,
  servicesGet,
  serviceGetById,
  updateServices,
  ServicesDelete
};
