import React from "react";
import SearchBar from "../components/SearchBar";
import Calendar from "../components/Calendar";
import Total from "../components/Total";
import data from "./table.json";
import Table from "../components/Table";
import { Order } from "../interface/order";
import Pagination from "../components/Pagination";

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

const Orders = () => {
  return (
    <div className="container orders">
      <SearchBar />
      <Calendar />
      <Total amount={0.0} />
      <Table orders={table} />
      <Pagination totalOrder={table.length} limit={5} pageNumber={1} goTo={1} />
    </div>
  );
};

export default Orders;
