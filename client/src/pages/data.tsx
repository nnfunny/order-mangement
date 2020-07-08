import { Order } from "../interface/order";
import data from "./table.json";
const table: Order[] = data.map((order) => {
  return {
    id: order.id,
    orderId: order.orderId,
    orderName: order.orderName,
    customerCompany: order.customerCompany,
    customerName: order.customerName,
    orderDate: order.orderDate,
    deliverdAmount: order.deliveredAmount,
    totalAmount: order.totalAmount,
  };
});
export default table;
