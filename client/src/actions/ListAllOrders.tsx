import axios from "axios";
import { URL } from "../App";
import { Order } from "../interface/order";
import { LIST_ORDER_SUCCUESS } from "../constants";

async function ListAll(
  limit: number,
  goTo: number,
  loading: boolean,
  filterDate: string
) {
  loading = true;
  const response = await axios.get(
    URL + `/api/orders/filter?page=${goTo}&limit=${limit}&method=${filterDate}`
  );
  const orders: Order[] = response.data;
  loading = false;
  return { type: LIST_ORDER_SUCCUESS, payload: { orders, loading } };
}

export default ListAll;
