require('dotenv').config();
const {auth, service, product, profile, user, sale} = require('./routes/routes')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Database = require('./database/config'); 

class Server {
  constructor() {
    this.server = express();
    this.port = process.env.PORT || 3001;
    this.database = new Database();

    this.server.use(bodyParser.urlencoded({ extended: false }));
    this.server.use(bodyParser.json());
    this.server.use(
      cors({
        exposedHeaders: '*',
        allowedHeaders: '*',
      })
    );

    this.server.get('/', (req, res) => {
      res.status(200).json({ message: 'Connect' });
    });

    this.server.use('/api/demo/auth', auth);
    this.server.use('/api/demo/service', service);
    this.server.use('/api/demo/product', product);
    this.server.use('/api/demo/profile', profile);
    this.server.use('/api/demo/user', user);
    this.server.use('/api/demo/sale', sale);
  }

  start() {
    this.server.listen(this.port, () => {
      console.log(`Server running at http://localhost:${this.port}`);
    });
  }
}

const server = new Server();
server.start();
