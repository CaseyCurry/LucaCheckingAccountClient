import React from "react";
import Transaction from "./Transaction";

const Transactions = ({transactions, areBeingCategorized, onTransactionClick}) => {
  const list = transactions.map((transaction) => {
    return <Transaction
      key={transaction.id}
      transaction={transaction}
      isBeingCategorized={areBeingCategorized}
      onClick={onTransactionClick}/>;
  });
  return <div className="transactions">
    <ul className="list-unstyled">{list}</ul>
  </div>;
};

Transactions.propTypes = {
  transactions: React
    .PropTypes
    .arrayOf(React.PropTypes.object)
    .isRequired,
  areBeingCategorized: React.PropTypes.bool.isRequired,
  onTransactionClick: React.PropTypes.func.isRequired
};

export default Transactions;
