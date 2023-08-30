const { Schema, model } = require('mongoose');

const products_Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    service: [{
        type: Schema.Types.ObjectId,
        ref: "services"
    }]
})
products_Schema.methods.toJSON = function idSetter() {
    const { _id, ...products } = this.toObject();
    products.id = _id;
    return products;
};


const Products = model('products', products_Schema);

module.exports = Products;