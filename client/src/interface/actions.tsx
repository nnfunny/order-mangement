import {
  LIMIT_ACTION,
  GO_TO_ACTION,
  KEYWORD_SEARCH_ACTION,
  LIST_ORDER_SUCCUESS,
} from "../constants";
import { Order } from "./order";

// LIMIT_ACTION
interface LimitAction {
  type: typeof LIMIT_ACTION;
  payload: number;
}

// GO_TO_ACTION
interface GoToAction {
  type: typeof GO_TO_ACTION;
  payload: number;
}

// KEYWORD_SEARCH_ACTION
interface KeywordSearchAction {
  type: typeof KEYWORD_SEARCH_ACTION;
  payload: string;
}

// LIST_ORDER_SUCCUESS,
export interface PayloadListOrderAction {
  orders: Order[];
  loading: boolean;
}
export interface ListOrderAction {
  type: typeof LIST_ORDER_SUCCUESS;
  payload: PayloadListOrderAction;
}

export type Actions =
  | LimitAction
  | GoToAction
  | KeywordSearchAction
  | ListOrderAction;
