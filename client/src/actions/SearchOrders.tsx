import Axios from "axios";
import { Order } from "../interface/order";
import { KEYWORD_SEARCH_ACTION, SEARCH_REQUEST_ACTION } from "../constants";
import { URL } from "../App";

async function SearchOrders(
  limit: number,
  goTo: number,
  keyword: string,
  loading: boolean,
  filterDate: string
) {
  loading = true;
  const { data } = await Axios.get(
    URL +
      `/api/orders/search?page=${goTo}&limit=${limit}&method=${filterDate}&keyword=${keyword}`
  );
  const orders: Order[] = data;
  loading = false;
  return { type: KEYWORD_SEARCH_ACTION, payload: { orders, loading } };
}

function SearchRequest(keyword: string) {
  let loading = true;
  return { type: SEARCH_REQUEST_ACTION, payload: { keyword, loading } };
}

export { SearchOrders, SearchRequest };
