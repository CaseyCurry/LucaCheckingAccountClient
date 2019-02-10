import React from "react";
import PropTypes from "prop-types";
import Split from "./Split";

class Transaction extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="transaction">
        {this.props.isSplitting && (
          <Split
            originalAmount={this.props.amount}
            splitAmount={this.props.splitAmount}
            isTransactionBeingSplit={this.props.isTransactionBeingSplit}
            onChangeSplitAmount={this.props.onChangeSplitAmount}
            onCompleteSplit={this.props.onCompleteSplit}
            onCancelSplit={this.props.onCancelSplit}
          />
        )}
        <input
          type="checkbox"
          checked={this.props.isSelectedToCategorize}
          onChange={() =>
            this.props.onToggleTransactionSelection(this.props.id)
          }
        />
        <img
          src="/resources/icons/split.svg"
          alt="split"
          onClick={e => {
            this.props.onStartSplit(this.props.id);
            e.stopPropagation();
          }}
        />
        <ul>
          <li>
            <label>id:</label>
            <span>{this.props.id}</span>
          </li>
          <li>
            <label>account:</label>
            <span>{this.props.account}</span>
          </li>
          <li>
            <label>description:</label>
            <span>{this.props.description}</span>
          </li>
          <li>
            <label>date:</label>
            <span>{this.props.date}</span>
          </li>
          <li>
            <label>amount:</label>
            <span>{this.props.amount}</span>
          </li>
          <li>
            <label>deposit:</label>
            <input type="checkbox" defaultChecked={this.props.isDeposit} />
          </li>
        </ul>
      </div>
    );
  }
}

Transaction.propTypes = {
  isSelectedToCategorize: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  _rev: PropTypes.string.isRequired,
  account: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  isDeposit: PropTypes.bool.isRequired,
  isSplitting: PropTypes.bool.isRequired,
  splitAmount: PropTypes.number.isRequired,
  isTransactionBeingSplit: PropTypes.bool.isRequired,
  onToggleTransactionSelection: PropTypes.func.isRequired,
  onStartSplit: PropTypes.func.isRequired,
  onChangeSplitAmount: PropTypes.func.isRequired,
  onCompleteSplit: PropTypes.func.isRequired,
  onCancelSplit: PropTypes.func.isRequired
};

export default Transaction;
