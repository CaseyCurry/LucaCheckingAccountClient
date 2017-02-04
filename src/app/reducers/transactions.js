import groupTransactions from "../helpers/group-transactions";

const initialState = {
  processing: false,
  data: {
    raw: [],
    groups: []
  },
  error: null
};
const findActionName = "FIND_UNCATEGORIZED_TRANSACTIONS";

export default (state = initialState, action) => {
  switch (action.type) {
    case `${findActionName}_PENDING`:
      {
        return Object.assign({}, state, {
          processing: true
        });
      }
    case `${findActionName}_REJECTED`:
      {
        return Object.assign({}, state, {
          processing: false,
          error: action.payload
        });
      }
    case `${findActionName}_FULFILLED`:
      {
        const groups = groupTransactions(action.payload.data);
        groups.forEach(group => {
          group.displayTransactions = false;
          group.displayCategories = false;
          group.transactions = group
            .transactions
            .map(transaction => {
              return Object.assign({}, transaction, {
                isSelected: false
              });
            });
        });
        return Object.assign({}, state, {
          processing: false,
          data: {
            raw: action.payload.data,
            groups: groups
          }
        });
      }
    case "TOGGLE_GROUP_DETAILS_VISIBILITY":
      {
        const phrase = action.payload;
        const toggleDisplayTransactions = true;
        return toggleGroupSettings(state, phrase, toggleDisplayTransactions);
      }
    case "TOGGLE_CATEGORIES_VISIBILITY":
      {
        const phrase = action.payload;
        const toggleDisplayTransactions = false;
        return toggleGroupSettings(state, phrase, toggleDisplayTransactions);
      }
    case "TOGGLE_TRANSACTION_SELECTION":
      {
        const phrase = action.payload.phrase;
        const transactionId = action.payload.transactionId;
        return toggleTransactionSelection(state, phrase, transactionId);
      }
  }

  return state;
};

const toggleGroupSettings = (state, phrase, toggleDisplayTransactions) => {
  const groups = state
    .data
    .groups
    .map(group => {
      if (group.phrase === phrase) {
        if (toggleDisplayTransactions) {
          return Object.assign({}, group, {
            displayTransactions: !group.displayTransactions,
            displayCategories: false
          });
        } else {
          const displayCategories = !group.displayCategories;
          const isSelected = displayCategories ? true : false;
          group.transactions = group.transactions.map(transaction => {
            return Object.assign({}, transaction, {
              isSelected
            });
          });
          return Object.assign({}, group, {
            displayCategories
          });
        }
      } else {
        return group;
      }
    });
  const data = Object.assign({}, state.data, {
    groups
  });
  return Object.assign({}, state, {
    data
  });
};

const toggleTransactionSelection = (state, phrase, transactionId) => {
  const groups = state
    .data
    .groups
    .map(group => {
      if (group.phrase === phrase) {
        const transactions = group.transactions.map(transaction => {
          if (transaction.id === transactionId) {
            const isSelected = !transaction.isSelected;
            return Object.assign({}, transaction, {
              isSelected
            });
          }
          return transaction;
        });
        return Object.assign({}, group, {
          transactions
        });
      }
      return group;
    });
  const data = Object.assign({}, state.data, {
    groups
  });
  return Object.assign({}, state, {
    data
  });
};
