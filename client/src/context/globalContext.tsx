import React, { useContext, ReactNode, useState } from "react";
import { Order } from "../interface/order";
import GlobalType from "../interface/global";

interface Props {
  children: ReactNode;
}

const defaultValue: GlobalType = {
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

const GlobalContext = React.createContext(defaultValue);

const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [global, setGlobal] = useState(defaultValue);
  return (
    <GlobalContext.Provider value={global}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;
