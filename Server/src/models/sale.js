const { Schema, model } = require("mongoose");

const sale_Schema = new Schema({
  clientId: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  sellerId: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  Info: [
    {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  saleDate: {
    type: String,
  },
  finishDate: {
    type: String
  },
  status: {
    type: Boolean,
  },
  price: {
    type: String,
    require: true
  },
  serviceId: {
    type: String
  }
});

sale_Schema.methods.toJSON = function idSetter() {
  const { _id, ...sale} = this.toObject();
  sale.id = _id;
  return sale;
};



const Sale = model("sale", sale_Schema);
module.exports = Sale;
