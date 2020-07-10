import React, { useEffect, Dispatch, useState } from "react";
// import { Order } from "../interface/order";
import GlobalTye from "../interface/global";
import { Actions } from "../interface/actions";
import ListAll from "../actions/ListAllOrders";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { SearchOrders } from "../actions/SearchOrders";
import {
  KEYWORD_SEARCH_ACTION,
  DATE_SUCCESS_ACTION,
  LIST_ORDER_SUCCUESS,
} from "../constants";
import moment from "moment";
import { CalendarOrders } from "../actions/CalendarOrders";

interface Props {
  state: GlobalTye;
  dispatch: Dispatch<Actions>;
}

const Table: React.FC<Props> = ({ state, dispatch }) => {
  const { orders, limit, loading, goTo, startDate, endDate, keyword } = state;
  const [isAcsending, setIsAcsending] = useState(false);

  useEffect(() => {
    if (keyword === "" && startDate === "" && endDate === "") {
      const filterDate: string = isAcsending ? "ascending" : "";
      ListAll(limit, goTo, loading, filterDate)
        .then((action) => {
          dispatch({ type: LIST_ORDER_SUCCUESS, payload: action.payload });
        })
        .catch((err) => console.log(err));
    }
  }, [limit, dispatch, loading, goTo, isAcsending]);

  useEffect(() => {
    const filterDate: string = isAcsending ? "ascending" : "";
    if (keyword !== "") {
      SearchOrders(limit, goTo, keyword, loading, filterDate)
        .then((action) => {
          dispatch({ type: KEYWORD_SEARCH_ACTION, payload: action.payload });
        })
        .catch((err) => console.log(err));
    }
  }, [keyword, limit, loading, goTo, isAcsending, dispatch]);

  useEffect(() => {
    const filterDate: string = isAcsending ? "ascending" : "";
    if (startDate !== "" && endDate !== "") {
      CalendarOrders(limit, goTo, loading, filterDate, startDate, endDate)
        .then((action) => {
          dispatch({ type: DATE_SUCCESS_ACTION, payload: action.payload });
        })
        .catch((err) => console.log(err));
    }
  }, [limit, loading, goTo, isAcsending, dispatch, startDate, endDate]);
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
                <th
                  scope="col"
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsAcsending(!isAcsending)}
                >
                  Order Date{" "}
                  {isAcsending ? (
                    <IoIosArrowUp className="pagination-icon" />
                  ) : (
                    <IoIosArrowDown className="pagination-icon" />
                  )}
                </th>
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
                    <td>{moment(order.orderDate).format("MMM Do, LT")}</td>
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
