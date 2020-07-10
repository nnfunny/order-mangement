import React, { useState, Dispatch } from "react";
import { CalendarRequest } from "../actions/CalendarOrders";
import { Actions } from "../interface/actions";
import { DATE_REQUEST_ACTION } from "../constants";

interface Props {
  dispatch: Dispatch<Actions>;
}
const Calendar: React.FC<Props> = ({ dispatch }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  function handleStartDate(e: React.ChangeEvent<HTMLInputElement>) {
    setStartDate(e.target.value);
  }
  function handleEndDate(e: React.ChangeEvent<HTMLInputElement>) {
    setEndDate(e.target.value);
  }
  function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    if (startDate !== "" && endDate !== "") {
      const action = CalendarRequest(startDate, endDate);
      dispatch({ type: DATE_REQUEST_ACTION, payload: action.payload });
    }
  }
  return (
    <div className="calendar">
      <div>
        <b>Created date</b>
        <div className="calendar-container">
          <form action="" onSubmit={handleSubmit}>
            <input
              value={startDate}
              type="date"
              name="startDate"
              id="startDate"
              onChange={handleStartDate}
              onChangeCapture={handleStartDate}
            />
            <input
              value={endDate}
              type="date"
              name="endDate"
              id="endDate"
              onChange={handleEndDate}
            />
            <button className="submit-button">Submit Date</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
