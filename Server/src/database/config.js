const mongoose = require('mongoose');
require('dotenv').config();

class Database {
    constructor() {
        const uri = process.env.URLDB;
        mongoose.set('strictQuery', false);
        mongoose.connect(uri, {
            useNewUrlParser: true
        });
        mongoose.connection.on('open', () => {
            console.log('Conectado a Mongo correctamente!');
        });
    }
}

module.exports = Database;
