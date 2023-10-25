const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  streaming_service: {
    type: Schema.Types.ObjectId,
    ref: "streaming_service",
  },
  profiles: [{
    type: Schema.Types.ObjectId,
    ref: "profile"
  }]
});
productSchema.methods.toJSON = function idSetter() {
  const { _id, ...product } = this.toObject();
  product.id = _id;
  return product;
};

const Product = model("product", productSchema);

module.exports = Product;
