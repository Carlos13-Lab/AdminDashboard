const mongoose = require('mongoose');
require('dotenv').config;
const uri = process.env.URLDB

mongoose.set('strictQuery', false);  

mongoose.connect(uri, {
    useNewUrlParser: true
});

mongoose.connection.on('open', () => {
    console.log('Conectado a Mongo correctamente!' );
}); 