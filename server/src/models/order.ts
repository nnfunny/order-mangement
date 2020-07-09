import mongoose, { Schema, Document } from "mongoose";
import { Order } from "../interfaces/order";

interface OrderModel extends Order, Document {}

const OrderSchema: Schema = new Schema({
  orderId: { type: String, required: true },
  orderName: { type: String, required: true },
  customerCompany: { type: String, required: true },
  customerName: { type: String, required: true },
  orderDate: { type: String, required: true },
  delieveredAmount: { type: Number },
  totalAmount: { type: Number, required: true },
});

export default mongoose.model<OrderModel>("orders", OrderSchema);
