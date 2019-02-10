import React from "react";
import PropTypes from "prop-types";
import Transaction from "./Transaction";

class TransactionDetails extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <ul className="transaction-details">
        {this.props.transactions.map(transaction => {
          return (
            <li key={transaction.id}>
              <Transaction
                isSelectedToCategorize={transaction.isSelectedToCategorize}
                isSplitting={
                  !!this.props.splittingTransaction &&
                  this.props.splittingTransaction.id === transaction.id
                }
                id={transaction.id}
                _rev={transaction._rev} // eslint-disable-line no-underscore-dangle
                account={transaction.account}
                description={transaction.description}
                date={transaction.date}
                amount={transaction.amount}
                isDeposit={transaction.isDeposit}
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
            </li>
          );
        })}
      </ul>
    );
  }
}

TransactionDetails.propTypes = {
  transactions: PropTypes.array.isRequired,
  splittingTransaction: PropTypes.object,
  splitAmount: PropTypes.number.isRequired,
  isTransactionBeingSplit: PropTypes.bool.isRequired,
  onToggleTransactionSelection: PropTypes.func.isRequired,
  onStartSplit: PropTypes.func.isRequired,
  onChangeSplitAmount: PropTypes.func.isRequired,
  onCompleteSplit: PropTypes.func.isRequired,
  onCancelSplit: PropTypes.func.isRequired
};

export default TransactionDetails;
