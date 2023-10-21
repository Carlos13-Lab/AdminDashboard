const { Schema, model } = require("mongoose");

const streamingServiceSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

streamingServiceSchema.methods.toJSON = function idSetter() {
  const { _id, ...services } = this.toObject();
  services.id = _id;
  return services;
};

const StreamingService = model("streaming_service", streamingServiceSchema);

module.exports = StreamingService;
