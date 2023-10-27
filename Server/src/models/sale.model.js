const { Schema, model } = require("mongoose");

const sale_Schema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "product",
  },
  saleDate: {
    type: String,
  },
  finishDate: {
    type: String,
  },
  status: {
    type: Boolean,
  },
  price: {
    type: String,
    require: true,
  },
});

sale_Schema.methods.toJSON = function idSetter() {
  const { _id, ...sale } = this.toObject();
  sale.id = _id;
  return sale;
};

const Sale = model("sale", sale_Schema);
module.exports = Sale;
