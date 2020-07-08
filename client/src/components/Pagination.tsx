import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface Props {
  totalOrder: number;
  limit: number;
  pageNumber: number;
  goTo: Number;
}

const Pagination: React.FC<Props> = ({
  totalOrder,
  limit,
  pageNumber,
  goTo,
}) => {
  return (
    <div className="pagination-container">
      <span className="total-order">Total {totalOrder}</span>
      <select name="limit" id="limit">
        <option value={5}>5/page</option>
        <option value={15}>15/page</option>
        <option value={25}>25/page</option>
      </select>
      <span className="current-page">
        <IoIosArrowBack className="pagination-icon" />
        <input type="number" min="1" value={pageNumber} />
        <IoIosArrowForward className="pagination-icon" />
      </span>
      <span className="go-to">Go to</span>
      <input type="number" name="goTo" id="goTo" min="1" value={pageNumber} />
    </div>
  );
};

export default Pagination;
