import React from "react";
import SearchBar from "../components/SearchBar";
import Calendar from "../components/Calendar";
import Total from "../components/Total";

const Orders = () => {
  return (
    <div className="container orders">
      <SearchBar />
      <Calendar />
      <Total amount={0.0} />
    </div>
  );
};

export default Orders;
