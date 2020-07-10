import { DATE_REQUEST_ACTION, DATE_SUCCESS_ACTION } from "../constants";
import Axios from "axios";
import { Order } from "../interface/order";
import { URL } from "../App";

function CalendarRequest(startDate: string, endDate: string) {
  let loading = true;
  return {
    type: DATE_REQUEST_ACTION,
    payload: { startDate, endDate, loading },
  };
}

async function CalendarOrders(
  limit: number,
  goTo: number,
  loading: boolean,
  filterDate: string,
  startDate: string,
  endDate: string
) {
  loading = true;
  const { data } = await Axios.get(
    URL +
      `/api/orders/date?page=${goTo}&limit=${limit}&method=${filterDate}&from=${startDate}&to=${endDate}`
  );
  const orders: Order[] = data;
  loading = false;
  return { type: DATE_SUCCESS_ACTION, payload: { orders, loading } };
}

export { CalendarRequest, CalendarOrders };
