import React, { useState, useEffect } from "react";
import GlobalTye from "../interface/global";

interface Props {
  state: GlobalTye;
}
const Total: React.FC<Props> = ({ state }) => {
  const [total, setTotal] = useState(0);
  const { orders } = state;
  useEffect(() => {
    if (orders.length !== 0) {
      let sum = orders!.reduce((prev, curr) => prev + curr.totalAmount, 0);
      setTotal(sum);
    } else {
      setTotal(0);
    }
  }, [total, orders]);
  return (
    <div className="total">
      Total: <span> ${total}</span>
    </div>
  );
};
export default Total;
