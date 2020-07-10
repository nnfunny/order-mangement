import {
  LIMIT_ACTION,
  GO_TO_ACTION,
  KEYWORD_SEARCH_ACTION,
  LIST_ORDER_SUCCUESS,
  SEARCH_REQUEST_ACTION,
  DATE_REQUEST_ACTION,
  DATE_SUCCESS_ACTION,
} from "../constants";
import { Order } from "./order";
import { BlockquoteHTMLAttributes } from "react";

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
  payload: PayloadListOrderAction;
}
interface PayloadKeywordRequest {
  keyword: string;
  loading: boolean;
}
interface SearchRequestAction {
  type: typeof SEARCH_REQUEST_ACTION;
  payload: PayloadKeywordRequest;
}

// DATE_REQUEST_ACTION
interface PayloadDateRequest {
  startDate: string;
  endDate: string;
  loading: boolean;
}
interface DateRequestAction {
  type: typeof DATE_REQUEST_ACTION;
  payload: PayloadDateRequest;
}
interface DateSucessAction {
  type: typeof DATE_SUCCESS_ACTION;
  payload: PayloadListOrderAction;
}

// LIST_ORDER_SUCCUESS
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
  | ListOrderAction
  | SearchRequestAction
  | DateRequestAction
  | DateSucessAction;
