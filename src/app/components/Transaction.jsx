import React from "react";
import TransactionAttribute from "./TransactionAttribute";

const Transaction = ({transaction, isBeingCategorized, onClick}) => {
  return (
    <li className="row">
      <div
        className="col-xs-12"
        onClick={isBeingCategorized
        ? () => onClick()(transaction.id)
        : ""}>
        <ul className="transaction list-unstyled">
          {isBeingCategorized && <li key="selector" className="selector">
            <input type="checkbox" checked={transaction.isSelected} readOnly/>
          </li>}
          <TransactionAttribute name="date" value={transaction.date}/>
          <TransactionAttribute name="amount" value={"$" + transaction.amount}/>
          <TransactionAttribute name="description" value={transaction.description}/>
        </ul>
      </div>
    </li>
  );
};

Transaction.propTypes = {
  transaction: React
    .PropTypes
    .shape({id: React.PropTypes.number.isRequired, description: React.PropTypes.string.isRequired, date: React.PropTypes.string.isRequired, amount: React.PropTypes.number.isRequired})
    .isRequired,
  isBeingCategorized: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func.isRequired
};

export default Transaction;
