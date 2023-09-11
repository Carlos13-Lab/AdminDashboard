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
      ref: "products",
    },
  ],
  saleDate: {
    type: String,

  },
  status: {
    type: Boolean,
  },
  price: {
    type: String,
    require: true
  }
});

const Sale = model("sale", sale_Schema);

module.exports = Sale;
