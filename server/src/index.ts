import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

/* CONFIGURATION */
dotenv.config(); // this will setup our env setup so it would work
const app = express(); // create express app
app.use(express.json()); // parses incoming requests with JSON payloads
app.use(helmet()); // helps secure Express apps by setting various HTTP headers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Blocks others from reading the content of your site
app.use(morgan("common")); // logs all requests to the console
app.use(bodyParser.json()); // parses incoming requests with JSON payloads
app.use(bodyParser.urlencoded({ extended: false })); // parses incoming requests with URL-encoded payloads
app.use(cors()); // allows cross-origin requests

/* ROUTES */
app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

/* SERVER */
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is running on port ${port}`));
