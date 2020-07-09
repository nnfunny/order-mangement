import GlobalTye from "../interface/global";
import { Actions } from "../interface/actions";
import {
  LIMIT_ACTION,
  GO_TO_ACTION,
  KEYWORD_SEARCH_ACTION,
  LIST_ORDER_SUCCUESS,
} from "../constants";

function reducers(state: GlobalTye, action: Actions) {
  switch (action.type) {
    case LIMIT_ACTION:
      return { ...state, limit: action.payload };
    case GO_TO_ACTION:
      return { ...state, goTo: action.payload };
    case KEYWORD_SEARCH_ACTION:
      return { ...state, keyword: action.payload };
    case LIST_ORDER_SUCCUESS:
      return {
        ...state,
        loading: action.payload.loading,
        orders: action.payload.orders,
      };
    default:
      return state;
  }
}
export default reducers;
