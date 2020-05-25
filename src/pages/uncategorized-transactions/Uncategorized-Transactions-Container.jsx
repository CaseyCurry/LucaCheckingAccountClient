import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import actions from "./actions";
import UncategorizedTransactions from "./components/Uncategorized-Transactions";

class UncategorizedTransactionsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onDisplayGroups();
  }

  render() {
    return (
      <UncategorizedTransactions
        areGroupsLoading={this.props.areGroupsLoading}
        groups={this.props.groups}
        selectedGroup={this.props.selectedGroup}
        selectedCategory={this.props.selectedCategory}
        selectedSubcategory={this.props.selectedSubcategory}
        splittingTransaction={this.props.splittingTransaction}
        splitAmount={this.props.splitAmount}
        isTransactionBeingSplit={this.props.isTransactionBeingSplit}
        onDisplayDetails={this.props.onDisplayDetails}
        onHideDetails={this.props.onHideDetails}
        onToggleTransactionSelection={this.props.onToggleTransactionSelection}
        onDisplayCategories={this.props.onDisplayCategories}
        onHideCategories={this.props.onHideCategories}
        onSelectCategory={this.props.onSelectCategory}
        onSelectSubcategory={this.props.onSelectSubcategory}
        onCategorize={this.props.onCategorize}
        onStartSplit={this.props.onStartSplit}
        onChangeSplitAmount={this.props.onChangeSplitAmount}
        onCompleteSplit={this.props.onCompleteSplit}
        onCancelSplit={this.props.onCancelSplit}
      />
    );
  }
}

UncategorizedTransactionsContainer.propTypes = {
  areGroupsLoading: PropTypes.bool.isRequired,
  groups: PropTypes.array.isRequired,
  selectedGroup: PropTypes.object.isRequired,
  selectedCategory: PropTypes.string,
  selectedSubcategory: PropTypes.string,
  splittingTransaction: PropTypes.object,
  splitAmount: PropTypes.number.isRequired,
  isTransactionBeingSplit: PropTypes.bool.isRequired,
  onDisplayGroups: PropTypes.func.isRequired,
  onDisplayDetails: PropTypes.func.isRequired,
  onHideDetails: PropTypes.func.isRequired,
  onToggleTransactionSelection: PropTypes.func.isRequired,
  onDisplayCategories: PropTypes.func.isRequired,
  onHideCategories: PropTypes.func.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
  onSelectSubcategory: PropTypes.func.isRequired,
  onCategorize: PropTypes.func.isRequired,
  onStartSplit: PropTypes.func.isRequired,
  onChangeSplitAmount: PropTypes.func.isRequired,
  onCompleteSplit: PropTypes.func.isRequired,
  onCancelSplit: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return state.uncategorizedTransactions;
};

const mapDispatchToProps = dispatch => {
  return {
    onDisplayGroups: () => {
      dispatch(actions.displayGroups());
    },
    onDisplayDetails: (phrase, ids) => {
      dispatch(actions.displayDetails(phrase, ids));
    },
    onHideDetails: () => {
      dispatch(actions.hideDetails());
    },
    onToggleTransactionSelection: id => {
      dispatch(actions.toggleTransactionSelection(id));
    },
    onDisplayCategories: phrase => {
      dispatch(actions.displayCategories(phrase));
    },
    onHideCategories: () => {
      dispatch(actions.hideCategories());
    },
    onSelectCategory: category => {
      dispatch(actions.selectCategory(category));
    },
    onSelectSubcategory: subcategory => {
      dispatch(actions.selectSubcategory(subcategory));
    },
    onCategorize: (category, subcategory, ids) => {
      dispatch(actions.categorize(category, subcategory, ids));
    },
    onStartSplit: transaction => {
      dispatch(actions.startSplit(transaction));
    },
    onChangeSplitAmount: (newAmount, originalAmount) => {
      dispatch(actions.changeSplitAmount(newAmount, originalAmount));
    },
    onCompleteSplit: (originalTransaction, splitAmount) => {
      dispatch(actions.completeSplit(originalTransaction, splitAmount));
    },
    onCancelSplit: () => {
      dispatch(actions.cancelSplit());
    }
  };
};

const mergeProps = (propsFromState, propsFromDispatch) => {
  return Object.assign({}, propsFromState, propsFromDispatch, {
    onCategorize: () => {
      const transactionIds = [];
      if (propsFromState.selectedGroup.details.length) {
        propsFromState.selectedGroup.details
          .filter(transaction => transaction.isSelectedToCategorize)
          .forEach(transaction => transactionIds.push(transaction.id));
      } else {
        transactionIds.push(...propsFromState.selectedGroup.transactions);
      }
      propsFromDispatch.onCategorize(
        propsFromState.selectedSubcategory,
        transactionIds
      );
    },
    onStartSplit: id => {
      const transaction = propsFromState.selectedGroup.details.find(
        transaction => transaction.id === id
      );
      propsFromDispatch.onStartSplit(transaction);
    },
    onCompleteSplit: () => {
      const originalTransaction = propsFromState.splittingTransaction;
      const splitAmount = propsFromState.splitAmount;
      propsFromDispatch.onCompleteSplit(originalTransaction, splitAmount);
    }
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(UncategorizedTransactionsContainer);
