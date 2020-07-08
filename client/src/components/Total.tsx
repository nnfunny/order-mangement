import React from "react";

interface Props {
  amount: number;
}
const Total: React.FC<Props> = ({ amount }) => {
  return (
    <div className="total">
      Total: <span> ${amount}</span>
    </div>
  );
};
export default Total;
