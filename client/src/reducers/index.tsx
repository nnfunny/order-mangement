import GlobalTye from "../interface/global";
import { Actions } from "../interface/actions";
import {
  LIMIT_ACTION,
  GO_TO_ACTION,
  KEYWORD_SEARCH_ACTION,
} from "../constants";

function reducers(state: GlobalTye, action: Actions) {
  switch (action.type) {
    case LIMIT_ACTION:
      return { ...state, limit: action.payload };
    case GO_TO_ACTION:
      return { ...state, goTo: action.payload };
    case KEYWORD_SEARCH_ACTION:
      return { ...state, keyword: action.payload };
    default:
      return state;
  }
}
export default reducers;
