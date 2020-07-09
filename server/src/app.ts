import express, { Application, Request, Response } from "express";
import moogose from "mongoose";
import { URI } from "./credential";
import OrderModel from "./models/order";
import { Order } from "./interfaces/order";
import { ResolveOptions } from "dns";
import order from "./models/order";

// Express App
const app: Application = express();
const PORT: number | string = process.env.PORT || 5000;

// Connect MongoDB
const dbURI: string = URI;
moogose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT))
  .catch((err) => console.log(err));

// Middleware
app.use(express.urlencoded({ extended: true }));

/* 
  API Routes
*/

// GET: /api/orders -> Get all orders
app.get("/api/orders", (req: Request, res: Response) => {
  OrderModel.find()
    .then((orders: Order[]) => res.send(orders))
    .catch((err) => console.log(err));
});

// GET: /api/orders/filter?page=<page>&limit=<limit>&method=<ascending> -> Sort orders
// by date (ascending OR descending)
app.get("/api/orders/filter", (req: Request, res: Response) => {
  const page: number = Number(req.query.page);
  const limit: number = Number(req.query.limit);
  const method = req.query.method;

  OrderModel.find()
    .sort({
      orderDate: method === "ascending" ? 1 : -1,
    })
    .skip((page - 1) * limit)
    .limit(limit)
    .then((orders: Order[]) => res.send(orders))
    .catch((err) => console.log(err));
});

// GET: /api/orders/search -> Search by keyword
app.get("/api/orders/search", (req: Request, res: Response) => {
  const page: number = Number(req.query.page);
  const limit: number = Number(req.query.limit);
  const method = req.query.method;
  const keyword: any = req.query.keyword;
  const rgx = new RegExp(`.*${keyword}.*`, "gi");
  console.log(rgx);
  OrderModel.find({
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
      {
        orderDate: {
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
    .then((orders: Order[]) => res.send(orders))
    .catch((err) => console.log(err));
});
