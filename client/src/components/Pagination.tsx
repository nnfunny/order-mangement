import React, { Dispatch, useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Actions } from "../interface/actions";
import { LIMIT_ACTION, GO_TO_ACTION } from "../constants";
import GlobalTye from "../interface/global";
import Axios from "axios";
import { URL } from "../App";

interface Props {
  state: GlobalTye;
  dispatch: Dispatch<Actions>;
}

const Pagination: React.FC<Props> = ({ state, dispatch }) => {
  const { orders, goTo, currentPage, limit } = state;
  const [max, setMax] = useState(0);
  const [goToValue, setGoTo] = useState(1);

  useEffect(() => {
    const fethedData = async () => {
      const { data } = await Axios.get(URL + "/api/orders");
      setMax(data.length);
    };
    fethedData();
  }, []);

  function handleGoTo(e: React.ChangeEvent<HTMLInputElement>) {
    const goToNumber: number = Number(e.target.value);
    let dispatchedNumber: number = 1;
    if (goToNumber < 0) {
      dispatchedNumber = 1;
    } else if (goToNumber > max / limit) {
      dispatchedNumber = goTo;
    } else {
      dispatchedNumber = goToNumber;
    }
    setGoTo(dispatchedNumber);
    dispatch({
      type: GO_TO_ACTION,
      payload: dispatchedNumber,
    });
  }

  function handleBackward() {
    let dispatchNumber: number = 1;
    if (currentPage - 1 < 1) {
      dispatchNumber = 1;
    } else {
      dispatchNumber = currentPage - 1;
    }
    setGoTo(dispatchNumber);
    dispatch({
      type: GO_TO_ACTION,
      payload: dispatchNumber,
    });
  }
  function handleForward() {
    let dispatchNumber: number = 1;
    if (currentPage + 1 > max / limit) {
      dispatchNumber = currentPage;
    } else {
      dispatchNumber = currentPage + 1;
    }
    setGoTo(dispatchNumber);
    dispatch({
      type: GO_TO_ACTION,
      payload: dispatchNumber,
    });
  }
  return (
    <div className="pagination-container">
      <span className="total-order">Total {orders.length}</span>
      <select
        name="limit"
        id="limit"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          dispatch({ type: LIMIT_ACTION, payload: Number(e.target.value) })
        }
      >
        <option value={5}>5/page</option>
        <option value={15}>15/page</option>
        <option value={25}>25/page</option>
      </select>
      <span className="current-page">
        <IoIosArrowBack className="pagination-icon" onClick={handleBackward} />
        <input
          type="number"
          min="1"
          value={currentPage === 0 ? "" : currentPage}
          readOnly
        />
        <IoIosArrowForward
          className="pagination-icon"
          onClick={handleForward}
        />
      </span>
      <span className="go-to">Go to</span>
      <input
        type="number"
        name="goTo"
        id="goTo"
        value={goToValue === 0 ? "" : goToValue}
        onChange={handleGoTo}
      />
    </div>
  );
};

export default Pagination;
