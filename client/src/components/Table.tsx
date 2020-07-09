import React, { useEffect, Dispatch } from "react";
// import { Order } from "../interface/order";
import GlobalTye from "../interface/global";
import { Actions, PayloadListOrderAction } from "../interface/actions";
import ListAll from "../actions/ListAllOrders";

interface Props {
  state: GlobalTye;
  dispatch: Dispatch<Actions>;
}

const Table: React.FC<Props> = ({ state, dispatch }) => {
  const { orders, limit, loading, currentPage } = state;

  useEffect(() => {
    ListAll(limit, currentPage, loading).then((action) => {
      const type: any = action.type;
      const payload: PayloadListOrderAction = action.payload;
      dispatch({ type, payload });
    });
  }, [limit, currentPage, dispatch, loading]);
  return (
    <div className="table-container">
      {state.loading ? (
        <div className="loader"></div>
      ) : (
        <>
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
              {orders.map((order, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <div style={{ fontWeight: "bold" }}>
                        {order.orderName}
                      </div>
                    </td>
                    <td>{order.customerCompany}</td>
                    <td>{order.customerName}</td>
                    <td>{order.orderDate}</td>
                    <td>
                      {order.deliveredAmount === 0
                        ? "--"
                        : order.deliveredAmount}
                    </td>
                    <td>{order.totalAmount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Table;
