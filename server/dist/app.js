"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const credential_1 = require("./credential");
const order_1 = __importDefault(require("./models/order"));
// Express App
const app = express_1.default();
const PORT = process.env.PORT || 5000;
// Connect MongoDB
const dbURI = process.env.URI || credential_1.URI;
mongoose_1.default
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT))
    .catch((err) => console.log(err));
// Middleware
app.use(express_1.default.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
/*
  API Routes
*/
// GET: /api/orders -> Get all orders
app.get("/api/orders", (req, res) => {
    order_1.default.find()
        .then((orders) => res.send(orders))
        .catch((err) => console.log(err));
});
// GET: /api/orders/filter?page=<page>&limit=<limit>&method=<ascending> -> Sort orders
// by date (ascending OR descending)
app.get("/api/orders/filter", (req, res) => {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const method = req.query.method;
    order_1.default.find()
        .sort({
        orderDate: method === "ascending" ? 1 : -1,
    })
        .skip((page - 1) * limit)
        .limit(limit)
        .then((orders) => res.send(orders))
        .catch((err) => console.log(err));
});
// GET: /api/orders/search -> Search by keyword
app.get("/api/orders/search", (req, res) => {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const method = req.query.method;
    const keyword = req.query.keyword;
    const rgx = new RegExp(`.*${keyword}.*`, "gi");
    order_1.default.find({
        $or: [
            {
                orderName: {
                    $regex: rgx,
                },
            },
            {
                customerName: {
                    $regex: rgx,
                },
            },
            {
                customerCompany: {
                    $regex: rgx,
                },
            },
        ],
    })
        .sort({
        orderDate: method === "ascending" ? 1 : -1,
    })
        .skip((page - 1) * limit)
        .limit(limit)
        .then((orders) => res.send(orders))
        .catch((err) => console.log(err));
});
// GET: /api/orders/date?from=<from>&to=<to>
app.get("/api/orders/date", (req, res) => {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const method = req.query.method;
    const from = req.query.from;
    const to = req.query.to;
    console.log(limit, page);
    order_1.default.find({
        orderDate: {
            $gt: new Date(from),
            $lt: new Date(to),
        },
    })
        .sort({
        orderDate: method === "ascending" ? 1 : -1,
    })
        .skip((page - 1) * limit)
        .limit(limit)
        .then((orders) => res.send(orders))
        .catch((err) => console.log(err));
});
