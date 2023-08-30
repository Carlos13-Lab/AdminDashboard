const { Schema, model } = require('mongoose');

const Streaming_Services_Schema = new Schema({
    
    name: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    }, 
})
Streaming_Services_Schema.methods.toJSON = function idSetter() {
    const { _id, ...services } = this.toObject();
    services.id = _id;
    return services;
};

const Services = model('services', Streaming_Services_Schema);

module.exports = Services;