import React from "react";
import PropTypes from "prop-types";
import Loader from "../../../controls/Loader";
import TransactionDetails from "./Transaction-Details";
import Categories from "./Categories";

class Group extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="group col-sm-12">
        {this.props.phrase} ({this.props.transactions.length})
        {this.props.areTransactionDetailsLoading && (
          <div className="icon-loader">
            <Loader />
          </div>
        )}
        {!this.props.areTransactionDetailsLoading && (
          <img
            src="/resources/icons/details.svg"
            alt="details"
            onClick={e => {
              if (this.props.areDetailsDisplayed) {
                this.props.onHideDetails();
              } else {
                this.props.onDisplayDetails(
                  this.props.phrase,
                  this.props.transactions
                );
              }
              e.stopPropagation();
            }}
          />
        )}
        {this.props.areCategoriesLoading && (
          <div className="icon-loader">
            <Loader />
          </div>
        )}
        {!this.props.areCategoriesLoading && (
          <img
            src="/resources/icons/category.svg"
            alt="categories"
            onClick={e => {
              if (this.props.areCategoriesDisplayed) {
                this.props.onHideCategories();
              } else {
                this.props.onDisplayCategories(this.props.phrase);
              }
              e.stopPropagation();
            }}
          />
        )}
        {this.props.areCategoriesDisplayed && (
          <Categories
            categories={this.props.categories}
            selectedCategory={this.props.selectedCategory}
            selectedSubcategory={this.props.selectedSubcategory}
            areTransactionsBeingCategorized={
              this.props.areTransactionsBeingCategorized
            }
            onCategorize={this.props.onCategorize}
            onSelectCategory={this.props.onSelectCategory}
            onSelectSubcategory={this.props.onSelectSubcategory}
            onHideCategories={this.props.onHideCategories}
          />
        )}
        {this.props.areDetailsDisplayed && (
          <TransactionDetails
            transactions={this.props.details}
            splittingTransaction={this.props.splittingTransaction}
            splitAmount={this.props.splitAmount}
            isTransactionBeingSplit={this.props.isTransactionBeingSplit}
            onToggleTransactionSelection={
              this.props.onToggleTransactionSelection
            }
            onStartSplit={this.props.onStartSplit}
            onChangeSplitAmount={this.props.onChangeSplitAmount}
            onCompleteSplit={this.props.onCompleteSplit}
            onCancelSplit={this.props.onCancelSplit}
          />
        )}
      </div>
    );
  }
}

Group.propTypes = {
  phrase: PropTypes.string.isRequired,
  transactions: PropTypes.array.isRequired,
  areTransactionDetailsLoading: PropTypes.bool.isRequired,
  details: PropTypes.array.isRequired,
  areDetailsDisplayed: PropTypes.bool.isRequired,
  areCategoriesLoading: PropTypes.bool.isRequired,
  categories: PropTypes.object,
  areCategoriesDisplayed: PropTypes.bool.isRequired,
  selectedCategory: PropTypes.string,
  selectedSubcategory: PropTypes.string,
  areTransactionsBeingCategorized: PropTypes.bool.isRequired,
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

export default Group;
