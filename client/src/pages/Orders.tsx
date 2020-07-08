import React, { useReducer } from "react";
import SearchBar from "../components/SearchBar";
import Calendar from "../components/Calendar";
import Total from "../components/Total";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import reducers from "../reducers";
import GlobalTye from "../interface/global";
import table from "./data";

const initialState: GlobalTye = {
  startDate: "",
  endDate: "",
  keyword: "",
  totalPrice: 0,
  totalOrders: 0,
  limit: 5,
  currentPage: 1,
  goTo: 1,
  orders: [],
};
const Orders = () => {
  const [globalState, dispatch] = useReducer(reducers, initialState);
  console.log(globalState.keyword);
  return (
    <div className="container orders">
      <SearchBar dispatch={dispatch} />
      <Calendar />
      <Total amount={0.0} />
      <Table orders={table} />
      <Pagination
        totalOrder={table.length}
        limit={5}
        pageNumber={globalState.currentPage}
        goTo={globalState.goTo}
        dispatch={dispatch}
      />
    </div>
  );
};

export default Orders;
