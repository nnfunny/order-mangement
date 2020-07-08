import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker, FocusedInputShape } from "react-dates";
import React, { useState } from "react";
import moment from "moment";

type FocusedInput = FocusedInputShape | null;
type MomentType = moment.Moment | null;
interface Period {
  endDate: moment.Moment | null;
  startDate: moment.Moment | null;
}
const Calendar = () => {
  const [startDate, setStartDate] = useState<MomentType>(null);
  const [endDate, setEndDate] = useState<MomentType>(null);
  const [focusedInput, setFocusedInput] = useState<FocusedInput>(null);
  function handleDateChange(period: Period) {
    setStartDate(period.startDate);
    setEndDate(period.endDate);
  }

  function handleFocusedChange(focusedInput: FocusedInput) {
    setFocusedInput(focusedInput);
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
