import React from "react";
import SearchBar from "../components/SearchBar";
import Calendar from "../components/Calendar";

const Orders = () => {
  return (
    <div className="container orders">
      <SearchBar />
      <Calendar />
    </div>
  );
};

export default Orders;
