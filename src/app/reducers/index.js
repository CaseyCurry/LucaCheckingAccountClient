import {
  combineReducers
} from "redux";
import transactions from "./transactions";
import categories from "./categories";

const reducers = combineReducers({
  transactions,
  categories
});

export default reducers;
