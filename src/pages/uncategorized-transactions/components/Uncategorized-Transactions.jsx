import React from "react";
import PropTypes from "prop-types";
import Loader from "../../../controls/Loader";
import Group from "./Group";

class UncategorizedTransactions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.areGroupsLoading) {
      return (
        <div className="page">
          <Loader />
        </div>
      );
    }
    return (
      <div className="row page uncategorized-transactions">
        <ul className="list-group">
          {this.props.groups.map(group => {
            return (
              <li
                key={group.phrase}
                className={`row list-group-item ${
                  group.phrase === this.props.selectedGroup.phrase
                    ? "selected"
                    : ""
                }`}
              >
                <Group
                  phrase={group.phrase}
                  transactions={group.transactions}
                  areTransactionDetailsLoading={
                    group.phrase === this.props.selectedGroup.phrase
                      ? this.props.selectedGroup.areTransactionDetailsLoading
                      : false
                  }
                  details={
                    group.phrase === this.props.selectedGroup.phrase
                      ? this.props.selectedGroup.details
                      : []
                  }
                  areDetailsDisplayed={
                    group.phrase === this.props.selectedGroup.phrase
                      ? this.props.selectedGroup.areDetailsDisplayed
                      : false
                  }
                  areCategoriesLoading={
                    group.phrase === this.props.selectedGroup.phrase
                      ? this.props.selectedGroup.areCategoriesLoading
                      : false
                  }
                  categories={
                    group.phrase === this.props.selectedGroup.phrase
                      ? this.props.selectedGroup.categories
                      : null
                  }
                  areCategoriesDisplayed={
                    group.phrase === this.props.selectedGroup.phrase
                      ? this.props.selectedGroup.areCategoriesDisplayed
                      : false
                  }
                  selectedCategory={this.props.selectedCategory}
                  selectedSubcategory={this.props.selectedSubcategory}
                  areTransactionsBeingCategorized={
                    group.phrase === this.props.selectedGroup.phrase
                      ? this.props.selectedGroup.areTransactionsBeingCategorized
                      : false
                  }
                  splittingTransaction={this.props.splittingTransaction}
                  splitAmount={this.props.splitAmount}
                  isTransactionBeingSplit={this.props.isTransactionBeingSplit}
                  onDisplayDetails={this.props.onDisplayDetails}
                  onHideDetails={this.props.onHideDetails}
                  onToggleTransactionSelection={
                    this.props.onToggleTransactionSelection
                  }
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
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

UncategorizedTransactions.propTypes = {
  areGroupsLoading: PropTypes.bool.isRequired,
  groups: PropTypes.array.isRequired,
  selectedGroup: PropTypes.object.isRequired,
  selectedCategory: PropTypes.string,
  selectedSubcategory: PropTypes.string,
  splittingTransaction: PropTypes.object,
  splitAmount: PropTypes.number.isRequired,
  isTransactionBeingSplit: PropTypes.bool.isRequired,
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

export default UncategorizedTransactions;
