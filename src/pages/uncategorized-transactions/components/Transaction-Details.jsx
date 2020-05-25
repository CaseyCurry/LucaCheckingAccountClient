import React from "react";
import PropTypes from "prop-types";
import Transaction from "./Transaction";

class TransactionDetails extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="transaction-details">
        <div>
          $
          {this.props.transactions
            .reduce((x, y) => x + y.amount, 0)
            .toFixed(2)
            .toLocaleString()}
        </div>
        <ul>
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
      </div>
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
