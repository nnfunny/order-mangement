export interface Order {
  orderId: string;
  orderName: string;
  customerCompany: string;
  customerName: string;
  orderDate: Date;
  deliveredAmount: number;
  totalAmount: number;
}
