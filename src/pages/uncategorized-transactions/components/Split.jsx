import React from "react";
import PropTypes from "prop-types";
import Loader from "../../../controls/Loader";

class Split extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="split dialog">
        <div>
          {this.props.isTransactionBeingSplit && (
            <button>
              completing
              <Loader />
            </button>
          )}
          {!this.props.isTransactionBeingSplit && (
            <button
              onClick={e => {
                this.props.onCompleteSplit();
                e.stopPropagation();
              }}
            >
              complete
            </button>
          )}
          <button
            onClick={e => {
              this.props.onCancelSplit();
              e.stopPropagation();
            }}
          >
            cancel
          </button>
          <div>
            <label>
              available to split:
              <span>
                {(this.props.originalAmount - this.props.splitAmount).toFixed(
                  2
                )}
              </span>
            </label>
          </div>
          <input
            type="number"
            name="amount"
            step="0.01"
            value={this.props.splitAmount}
            onChange={e =>
              this.props.onChangeSplitAmount(
                e.target.value,
                this.props.originalAmount
              )
            }
          />
        </div>
      </div>
    );
  }
}

Split.propTypes = {
  originalAmount: PropTypes.number.isRequired,
  splitAmount: PropTypes.number.isRequired,
  isTransactionBeingSplit: PropTypes.bool.isRequired,
  onChangeSplitAmount: PropTypes.func.isRequired,
  onCompleteSplit: PropTypes.func.isRequired,
  onCancelSplit: PropTypes.func.isRequired
};

export default Split;
