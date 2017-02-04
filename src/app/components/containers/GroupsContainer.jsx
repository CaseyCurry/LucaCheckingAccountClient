import {connect} from "react-redux";
import * as actions from "../../actions";
import Groups from "../Groups";

const mapStateToProps = (state) => {
  const groups = state.transactions.data.groups;
  return {groups};
};

const mergeProps = (stateProps, dispatchProps) => {
  dispatchProps.handlers.onCategoryClick = (phrase) => {
    return (category) => {
      const transactions = stateProps
        .groups
        .find(group => group.phrase === phrase)
        .transactions
        .filter(transaction => transaction.isSelected);
      dispatchProps.dispatch(actions.categorizeTransactions(category, transactions));
    };
  };
  return Object.assign({}, stateProps, dispatchProps);
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    handlers: {
      onGroupClick: (phrase) => {
        dispatch(actions.toggleGroupDetailsVisibility(phrase));
      },
      onCategorizeClick: (phrase) => {
        dispatch(actions.toggleCategoriesVisibility(phrase));
      },
      onTransactionClick: (phrase) => {
        return (transactionId) => {
          dispatch(actions.toggleTransactionSelection(phrase, transactionId));
        };
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Groups);
