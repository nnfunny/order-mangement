import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker, FocusedInputShape } from "react-dates";
import React, { useState } from "react";
import moment from "moment";

const Calendar = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  function handleDateChange(period: any) {
    setStartDate(period.startDate);
    setEndDate(period.endDate);
  }

  function handleFocusedChange(focusedInput: any) {
    setFocusedInput(focusedInput || "startDate");
  }
  return (
    <>
      <DateRangePicker
        startDate={startDate}
        startDateId="startDate"
        endDate={endDate}
        endDateId="endDate"
        showDefaultInputIcon={true}
        onDatesChange={handleDateChange}
        focusedInput={focusedInput}
        onFocusChange={handleFocusedChange}
        small={true}
      />
    </>
  );
};

export default Calendar;
