import {
  LIMIT_ACTION,
  GO_TO_ACTION,
  KEYWORD_SEARCH_ACTION,
} from "../constants";
interface LimitAction {
  type: typeof LIMIT_ACTION;
  payload: number;
}
interface GoToAction {
  type: typeof GO_TO_ACTION;
  payload: number;
}
interface KeywordSearchAction {
  type: typeof KEYWORD_SEARCH_ACTION;
  payload: string;
}

export type Actions = LimitAction | GoToAction | KeywordSearchAction;
