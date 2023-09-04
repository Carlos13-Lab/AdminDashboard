const { Schema, model } = require("mongoose");

const profiles_Schema = new Schema({
  name: { 
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true
  },
  pin: {
    type: Number,
    min:1000,
    max:9999,
    required: true,
  },
  number: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  product: [{
    type: Schema.Types.ObjectId,
    ref: 'products'
  }],
});


profiles_Schema.methods.toJSON = function idSetter() {
  const { _id, ...profiles } = this.toObject();
  profiles.id = _id;
  return profiles;
};

const Profiles = model("profiles", profiles_Schema);

module.exports = Profiles;
