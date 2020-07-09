import React, { Dispatch } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Actions } from "../interface/actions";
import { LIMIT_ACTION, GO_TO_ACTION } from "../constants";

interface Props {
  totalOrder: number;
  pageNumber: number;
  goTo: number;
  dispatch: Dispatch<Actions>;
}

const Pagination: React.FC<Props> = ({
  totalOrder,
  pageNumber,
  goTo,
  dispatch,
}) => {
  return (
    <div className="pagination-container">
      <span className="total-order">Total {totalOrder}</span>
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
        <IoIosArrowBack className="pagination-icon" />
        <input type="number" min="1" value={pageNumber} readOnly />
        <IoIosArrowForward className="pagination-icon" />
      </span>
      <span className="go-to">Go to</span>
      <input
        type="number"
        name="goTo"
        id="goTo"
        value={goTo === 0 ? "" : goTo}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch({
            type: GO_TO_ACTION,
            payload: Number(e.target.value) < 0 ? 0 : Number(e.target.value),
          })
        }
      />
    </div>
  );
};

export default Pagination;
