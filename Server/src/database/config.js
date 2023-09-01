const mongoose = require('mongoose');
require('dotenv').config;
const uri = process.env.URLDB || 'mongodb://admin:admin@127.0.0.1:27017/thedbname?authSource=adminDashbord'

mongoose.set('strictQuery', false);  

mongoose.connect(uri, {
    useNewUrlParser: true
});

mongoose.connection.on('open', () => {
    console.log('Conectado a Mongo correctamente!' );
}); 