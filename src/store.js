import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import notificationReducers from "./components/notifications/reducers";
import uncategorizedTransactionReducers from "./pages/uncategorized-transactions/reducers";

const reducers = combineReducers({
  notifications: notificationReducers,
  uncategorizedTransactions: uncategorizedTransactionReducers
});

const middleware = applyMiddleware(promise(), thunk);

const store = createStore(reducers, compose(middleware));

export default store;
