require("dotenv").config();
const {
  Auth,
  StreamingService,
  Product,
  Profile,
  User,
  Sale
} = require("./routes/routes");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createProxyMiddleware } = require('http-proxy-middleware');
const Database = require("./database/config");

class Server {
  constructor() {
    this.server = express();
    this.port = process.env.PORT || 3001;
    this.database = new Database();

    this.server.use(bodyParser.urlencoded({ extended: false }));
    this.server.use(bodyParser.json());
    this.server.use(
      cors({
        exposedHeaders: "*",
        allowedHeaders: "*",
      })
    );

this.server.use('/api', createProxyMiddleware({
  target: 'https://admin-dashboard-36gcd6h6b-carlos13-lab.vercel.app',
  changeOrigin: true,
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:3000'
  }
}));
    this.server.get("/", (req, res) => {
      res.status(200).json({ message: "Connect" });
    });

    this.server.use("/api/auth", Auth);
    this.server.use("/api/service", StreamingService);
    this.server.use("/api/product", Product);
    this.server.use("/api/profile", Profile);
    this.server.use("/api/user", User);
    this.server.use("/api/sale", Sale);
  }

  start() {
    this.server.listen(this.port, () => {
      console.log(`Server running at http://localhost:${this.port}`);
    });
  }
}

const server = new Server();
server.start();
