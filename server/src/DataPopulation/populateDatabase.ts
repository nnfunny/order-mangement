import orders from "./json/orders.json";
import customers from "./json/customers.json";
import companies from "./json/customerCompanies.json";
import orderItems from "./json/orderItems.json";
import deliveries from "./json/deliveries.json";
import { Order } from "../interfaces/order";
import mongoose from "mongoose";
import { URI } from "../credential";
import OrderModel from "../models/order";

async function poplulateDatabase() {
  let data: Order[] = [];
  // Orders
  for await (const order of orders) {
    data.push({
      orderId: order.id,
      orderName: order.order_name,
      customerCompany: "",
      customerName: order.customer_id,
      orderDate: new Date(order.created_at),
      deliveredAmount: 0,
      totalAmount: 0,
    });
  }

  // Customer Names
  let mapCusomter = new Map<string, string[]>();
  for await (const customer of customers) {
    if (!mapCusomter.has(customer.user_id)) {
      mapCusomter.set(customer.user_id, [customer.name, customer.company_id]);
    }
  }
  for await (const order of data) {
    let name = order.customerName;
    order.customerName = mapCusomter.get(name)![0];
    order.customerCompany = mapCusomter.get(name)![1];
  }

  // Comapny Names
  let companyNames = new Map<string, string>();
  for await (const company of companies) {
    if (!companyNames.has(company.company_id)) {
      companyNames.set(company.company_id, company.company_name);
    }
  }
  for await (const order of data) {
    order.customerCompany = companyNames.get(order.customerCompany)!;
  }

  // Order Items + Delivered Amount
  let orderIdToOrderItem = new Map<string, string[]>();
  for await (const item of orderItems) {
    if (!orderIdToOrderItem.has(item.order_id)) {
      orderIdToOrderItem.set(item.order_id, [item.id]);
    } else {
      orderIdToOrderItem.get(item.order_id)!.push(item.id);
    }
  }
  let orderItemToDeliver = new Map<string, number>();
  for await (const delivery of deliveries) {
    if (!orderItemToDeliver.has(delivery.order_item_id)) {
      orderItemToDeliver.set(
        delivery.order_item_id,
        Number(delivery.delivered_quantity)
      );
    } else {
      let newQuantity: number =
        orderItemToDeliver.get(delivery.order_item_id)! +
        Number(delivery.delivered_quantity);
      orderItemToDeliver.set(delivery.order_item_id, newQuantity);
    }
  }
  let orderItemToPriceDelivery = new Map<string, number>();
  for await (const item of orderItems) {
    let priceUnit: number =
      item.price_per_unit === "" ? 0 : Number(item.price_per_unit);
    let quantity: number | undefined =
      orderItemToDeliver.get(item.id) === undefined
        ? 0
        : orderItemToDeliver.get(item.id);
    let price: number = quantity! * priceUnit;
    if (!orderItemToPriceDelivery.has(item.id)) {
      orderItemToPriceDelivery.set(item.id, Number(price.toFixed(2)));
    }
  }
  for await (const order of data) {
    let amount: number = 0;
    for await (const item of orderIdToOrderItem.get(order.orderId)!) {
      amount += orderItemToPriceDelivery.get(item)!;
    }
    order.deliveredAmount = amount;
  }

  // Total Amount
  let totalAmountMap = new Map<string, number>();
  for await (const item of orderItems) {
    let priceUnit: number =
      item.price_per_unit === "" ? 0 : Number(item.price_per_unit);
    let quantity: number = item.quantity === "" ? 0 : Number(item.quantity);
    if (!totalAmountMap.has(item.order_id)) {
      totalAmountMap.set(
        item.order_id,
        Number((priceUnit * quantity).toFixed(2))
      );
    } else {
      let newTotal: number =
        totalAmountMap.get(item.order_id)! + quantity * priceUnit;
      totalAmountMap.set(item.order_id, Number(newTotal.toFixed(2)));
    }
  }
  for await (const order of data) {
    order.totalAmount = totalAmountMap.get(order.orderId)!;
  }
  // console.log(data);
  return data;
}

// poplulateDatabase();
// Connect MongoDB
const dbURI = URI;

poplulateDatabase().then(async (data) => {
  await mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

  let count: number = 0;
  for await (const order of data) {
    count++;
    const newOrder = new OrderModel(order);
    newOrder
      .save()
      .then(() => console.log("Successfully"))
      .catch((error) => console.log(error));
  }
});
