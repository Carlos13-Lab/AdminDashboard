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
const Database = require("./database/config");

class Server {
  constructor() {
    this.server = express();
    this.port = process.env.PORT || 3001;
    this.database = new Database();

    this.server.use(bodyParser.urlencoded({ extended: false }));
    this.server.use(bodyParser.json());
    this.server.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
      res.header("Access-Control-Allow-Credentials", "true");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
      next();
    });
    this.server.use(
      cors({
        exposedHeaders: "*",
        allowedHeaders: "*",
      })
    );
    const corsOptions ={
      origin:'http://localhost:3000', 
      credentials:true,            //access-control-allow-credentials:true
      optionSuccessStatus:200
  }
  app.use(cors(corsOptions));

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
