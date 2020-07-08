import React from "react";
import { Order } from "../interface/order";

interface Props {
  orders: Order[];
}

const Table: React.FC<Props> = ({ orders }) => {
  return (
    <div className="table-container">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Order Name</th>
            <th scope="col">Customer Company</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Order Date</th>
            <th scope="col">Delivered Amount</th>
            <th scope="col">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <tr key={order.id}>
                <td>
                  <div style={{ fontWeight: "bold" }}>{order.orderId}</div>
                  <div>{order.orderName}</div>
                </td>
                <td>{order.customerCompany}</td>
                <td>{order.customerName}</td>
                <td>{order.orderDate}</td>
                <td>
                  {order.deliverdAmount === 0 ? "--" : order.deliverdAmount}
                </td>
                <td>{order.totalAmount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
