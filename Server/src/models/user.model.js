const { Schema, model } = require("mongoose");

const user_Schema = new Schema({

  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phone_Number: {
    type: Number,
    required: true,

  },
  active: {
    type: Boolean,
    default: true,
  },
  product:
    {
      type: Schema.Types.ObjectId,
      ref: "product"
    },
  role: {
    type: String,
    required: true,
    enum: ["admin", "seller", "client"],
  },
  sale: {
    type: Schema.Types.ObjectId,
    ref: 'sale'
  }
});

user_Schema.methods.toJSON = function idSetter() {
  const { _id, ...user } = this.toObject();
  user.id = _id;
  return user;
};


const User = model("user", user_Schema);

module.exports = User;
