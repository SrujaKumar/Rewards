import { combineReducers } from "redux";
import { GET_TRANSACTION_LIST, LOADING } from "../constant/customerContant";

const intialState = {
  transaction: [],
  loading: false,
  error: "",
};

const customers = (state = intialState, action) => {
  switch (action.type) {
    case GET_TRANSACTION_LIST:
      state = {
        ...state,
        loading: false,
        transaction: action.payload,
      };
      break;
    case LOADING: {
      state = {
        ...state,
        loading: action.payload,
      };
    }
    default:
      break;
  }
  return state;
};

const reducer = combineReducers({
  customers,
});
export default reducer;
