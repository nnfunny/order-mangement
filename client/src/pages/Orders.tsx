import React, { useReducer } from "react";
import SearchBar from "../components/SearchBar";
import Calendar from "../components/Calendar";
import Total from "../components/Total";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import reducers from "../reducers";
import GlobalTye from "../interface/global";

const initialState: GlobalTye = {
  loading: true,
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
  console.log(globalState.startDate, globalState.endDate);
  return (
    <div className="container orders">
      <SearchBar dispatch={dispatch} />
      <Calendar dispatch={dispatch} />
      <Total state={globalState} />
      <a href="/orders" className="refresh-button">
        REFRESH
      </a>
      <Table state={globalState} dispatch={dispatch} />
      <Pagination state={globalState} dispatch={dispatch} />
    </div>
  );
};

export default Orders;
