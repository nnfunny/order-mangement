import { Order } from "./order";

export default interface GlobalTye {
  loading: boolean;
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
