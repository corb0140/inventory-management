"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
/* IMPORT ROUTES */
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
/* CONFIGURATION */
dotenv_1.default.config(); // this will setup our env setup so it would work
const app = (0, express_1.default)(); // create express app
app.use(express_1.default.json()); // parses incoming requests with JSON payloads
app.use((0, helmet_1.default)()); // helps secure Express apps by setting various HTTP headers
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" })); // Blocks others from reading the content of your site
app.use((0, morgan_1.default)("common")); // logs all requests to the console
app.use(body_parser_1.default.json()); // parses incoming requests with JSON payloads
app.use(body_parser_1.default.urlencoded({ extended: false })); // parses incoming requests with URL-encoded payloads
app.use((0, cors_1.default)()); // allows cross-origin requests
/* ROUTES */
app.use("/dashboard", dashboardRoutes_1.default); // http://localhost:8000/dashboard
app.use("/products", productRoutes_1.default); // http://localhost:8000/products
/* SERVER */
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is running on port ${port}`));
