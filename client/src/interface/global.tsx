import { Order } from "./order";

export default interface GlobalTye {
  startDate: string;
  endDate: string;
  keyword: string;
  totalPrice: number;
  totalOrders: number;
  limit: number;
  currentPage: number;
  goTo: number;
  orders: Order[];
}
