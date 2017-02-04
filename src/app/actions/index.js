import api from "../api-proxy";
import findUncategorizedTransactionsAction from "./find-uncategorized-transactions";
import toggleGroupDetailsVisibilityAction from "./toggle-group-details-visibility";
import categorizeTransactionsAction from "./categorize-transactions";
import findCategoriesAction from "./find-categories";
import toggleCategoriesVisibilityAction from "./toggle-categories-visibility";
import toggleTransactionSelectionAction from "./toggle-transaction-selection";

export const findUncategorizedTransactions =
  findUncategorizedTransactionsAction(api("transactions/states/uncategorized"));

export const toggleGroupDetailsVisibility = toggleGroupDetailsVisibilityAction;

export const categorizeTransactions = categorizeTransactionsAction(
  api("transactions/states/categorized"),
  findUncategorizedTransactions);

export const findCategories = findCategoriesAction;

export const toggleCategoriesVisibility = toggleCategoriesVisibilityAction;

export const toggleTransactionSelection = toggleTransactionSelectionAction;
