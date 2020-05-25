const defaulSelectedGroup = {
  phrase: null,
  transactions: [],
  areTransactionDetailsLoading: false,
  details: [],
  areDetailsDisplayed: false,
  areCategoriesLoading: false,
  categories: [],
  areCategoriesDisplayed: false,
  areTransactionsBeingCategorized: false
};
const defaultSplitAmount = 0.01;
const initialState = Object.freeze({
  areGroupsLoading: false,
  groups: [],
  selectedGroup: defaulSelectedGroup,
  selectedCategory: "food",
  selectedSubcategory: null,
  splittingTransaction: null,
  splitAmount: defaultSplitAmount,
  isTransactionBeingSplit: false
});

const selectGroup = (groups, phrase) => {
  const group = groups.find(group => group.phrase === phrase);
  return Object.assign({}, defaulSelectedGroup, group);
};

const sortGroups = groups => {
  groups
    .sort((x, y) => {
      const a = x.phrase.toUpperCase();
      const b = y.phrase.toUpperCase();
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    })
    .sort((x, y) => y.transactions.length - x.transactions.length);
  return groups;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "DISPLAY_GROUPS_PENDING": {
      return Object.assign({}, initialState, {
        areGroupsLoading: true
      });
    }
    case "DISPLAY_GROUPS_REJECTED": {
      return Object.assign({}, state, {
        areGroupsLoading: false
      });
    }
    case "DISPLAY_GROUPS_FULFILLED": {
      const groups = sortGroups(action.payload.groups).map(group => {
        // decode
        return Object.assign({}, group, {
          phrase: new DOMParser().parseFromString(group.phrase, "text/html")
            .body.textContent
        });
      });
      return Object.assign({}, initialState, { groups });
    }
    case "DISPLAY_DETAILS_PENDING": {
      const selectedGroup =
        state.selectedGroup.phrase &&
        action.payload.phrase === state.selectedGroup.phrase
          ? Object.assign({}, state.selectedGroup)
          : selectGroup(state.groups, action.payload.phrase);
      selectedGroup.areTransactionDetailsLoading = true;
      return Object.assign({}, state, {
        selectedGroup
      });
    }
    case "DISPLAY_DETAILS_REJECTED": {
      if (state.selectedGroup.phrase != action.payload.phrase) {
        return state;
      }
      return Object.assign({}, state, {
        selectedGroup: defaulSelectedGroup
      });
    }
    case "DISPLAY_DETAILS_FULFILLED": {
      if (state.selectedGroup.phrase != action.payload.phrase) {
        return state;
      }
      const details = action.payload.details
        .sort((x, y) => {
          const a = x.description.toUpperCase();
          const b = y.description.toUpperCase();
          if (a < b) {
            return -1;
          }
          if (a > b) {
            return 1;
          }
          return 0;
        })
        .sort((x, y) => new Date(y.date) - new Date(x.date))
        .map(transaction => {
          return Object.assign({}, transaction, {
            isSelectedToCategorize: true
          });
        });
      const selectedGroup = Object.assign({}, state.selectedGroup, {
        areTransactionDetailsLoading: false,
        details,
        areDetailsDisplayed: true
      });
      return Object.assign({}, state, {
        selectedGroup
      });
    }
    case "HIDE_DETAILS": {
      const selectedGroup = Object.assign({}, state.selectedGroup, {
        areDetailsDisplayed: false
      });
      return Object.assign({}, state, {
        selectedGroup
      });
    }
    case "DISPLAY_CATEGORIES_PENDING": {
      const selectedGroup =
        state.selectedGroup.phrase &&
        action.payload.phrase === state.selectedGroup.phrase
          ? Object.assign({}, state.selectedGroup)
          : selectGroup(state.groups, action.payload.phrase);
      selectedGroup.areCategoriesLoading = true;
      return Object.assign({}, state, {
        selectedGroup
      });
    }
    case "DISPLAY_CATEGORIES_REJECTED": {
      if (state.selectedGroup.phrase != action.payload.phrase) {
        return state;
      }
      return Object.assign({}, state, {
        selectedGroup: defaulSelectedGroup
      });
    }
    case "DISPLAY_CATEGORIES_FULFILLED": {
      if (state.selectedGroup.phrase != action.payload.phrase) {
        return state;
      }
      const selectedGroup = Object.assign({}, state.selectedGroup, {
        areCategoriesLoading: false,
        categories: action.payload.categories,
        areCategoriesDisplayed: true
      });
      return Object.assign({}, state, {
        selectedGroup
      });
    }
    case "HIDE_CATEGORIES": {
      const selectedGroup = Object.assign({}, state.selectedGroup, {
        areCategoriesDisplayed: false
      });
      return Object.assign({}, state, {
        selectedGroup
      });
    }
    case "SELECT_CATEGORY": {
      return Object.assign({}, state, {
        selectedCategory: action.payload.category
      });
    }
    case "SELECT_SUBCATEGORY": {
      return Object.assign({}, state, {
        selectedSubcategory: action.payload.subcategory
      });
    }
    case "CATEGORIZE_PENDING": {
      const selectedGroup = Object.assign({}, state.selectedGroup, {
        areTransactionsBeingCategorized: true
      });
      return Object.assign({}, state, {
        selectedGroup
      });
    }
    case "CATEGORIZE_REJECTED": {
      const selectedGroup = Object.assign({}, state.selectedGroup, {
        areTransactionsBeingCategorized: false
      });
      return Object.assign({}, state, {
        selectedGroup
      });
    }
    case "CATEGORIZE_FULFILLED": {
      const categorizedTransactions = state.selectedGroup.details.length
        ? state.selectedGroup.details
          .filter(transaction => transaction.isSelectedToCategorize)
          .map(transaction => transaction.id)
        : state.selectedGroup.transactions;
      let groups = state.groups
        .map(group => {
          const transactions = group.transactions.filter(
            transaction => !categorizedTransactions.includes(transaction)
          );
          if (transactions.length) {
            return Object.assign({}, group, { transactions });
          }
        })
        .filter(group => group);
      groups = sortGroups(groups);
      /* Do not reset the selected category. It will be the default for the
         next transaction or group categorized. */
      return Object.assign({}, state, {
        groups,
        selectedGroup: defaulSelectedGroup
      });
    }
    case "TOGGLE_TRANSACTION_SELECTION": {
      const details = state.selectedGroup.details.map(transaction => {
        if (transaction.id === action.payload.id) {
          return Object.assign({}, transaction, {
            isSelectedToCategorize: !transaction.isSelectedToCategorize
          });
        }
        return transaction;
      });
      const selectedGroup = Object.assign({}, state.selectedGroup, { details });
      return Object.assign({}, state, { selectedGroup });
    }
    case "START_SPLIT": {
      return Object.assign({}, state, {
        splittingTransaction: action.payload
      });
    }
    case "CHANGE_SPLIT_AMOUNT_FULFILLED": {
      return Object.assign({}, state, {
        splitAmount: action.payload
      });
    }
    case "COMPLETE_SPLIT_PENDING": {
      return Object.assign({}, state, {
        isTransactionBeingSplit: true
      });
    }
    case "COMPLETE_SPLIT_FULFILLED": {
      const groups = state.groups
        .map(group => {
          if (
            group.transactions.find(
              id => id === action.payload.originalTransaction.id
            )
          ) {
            const transactions = [...group.transactions];
            transactions.push(action.payload.newTransaction.id);
            return Object.assign({}, group, { transactions });
          }
          return group;
        })
        .sort((x, y) => x.transactions.length - y.transactions.length);
      const details = state.selectedGroup.details.map(transaction => {
        if (transaction.id === action.payload.originalTransaction.id) {
          return Object.assign({}, action.payload.originalTransaction, {
            isSelectedToCategorize: true
          });
        }
        return transaction;
      });
      details.push(
        Object.assign({}, action.payload.newTransaction, {
          _rev: "123", // TODO: get the actual _rev from the server
          isSelectedToCategorize: true
        })
      );
      const selectedGroup = Object.assign({}, state.selectedGroup, {
        details,
        transactions: details.map(transaction => transaction.id)
      });
      return Object.assign({}, state, {
        isTransactionBeingSplit: false,
        splitAmount: defaultSplitAmount,
        splittingTransaction: null,
        groups,
        selectedGroup
      });
    }
    case "COMPLETE_SPLIT_REJECTED": {
      return Object.assign({}, state, {
        isTransactionBeingSplit: false
      });
    }
    case "CANCEL_SPLIT": {
      return Object.assign({}, state, {
        splitAmount: defaultSplitAmount,
        splittingTransaction: null
      });
    }
  }

  return state;
};
