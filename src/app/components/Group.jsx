import React from "react";
import Transactions from "./Transactions";
import CategoryPullout from "./CategoryPullout";

const Group = ({group, handlers}) => {
  return (
    <li className="row">
      <div onClick={() => handlers.onGroupClick(group.phrase)}>
        <span className="group">{group
            .phrase
            .toUpperCase()}
          &nbsp;
        </span>
        <sup>({group.transactions.length})</sup>
      </div>
      {group.displayTransactions && <div>
        <CategoryPullout
          phrase={group.phrase}
          isOut={group.displayCategories}
          handlers={handlers}/>
        <Transactions
          transactions={group.transactions}
          areBeingCategorized={group.displayCategories}
          onTransactionClick={() => handlers.onTransactionClick(group.phrase)}/>
      </div>}
    </li>
  );
};

Group.propTypes = {
  group: React
    .PropTypes
    .shape({
      phrase: React.PropTypes.string.isRequired,
      transactions: React
        .PropTypes
        .arrayOf(React.PropTypes.object)
        .isRequired,
      displayTransactions: React.PropTypes.bool.isRequired,
      displayCategories: React.PropTypes.bool.isRequired
    })
    .isRequired,
  handlers: React
    .PropTypes
    .shape({onGroupClick: React.PropTypes.func.isRequired, onCategorizeClick: React.PropTypes.func.isRequired, onTransactionClick: React.PropTypes.func.isRequired})
    .isRequired
};

export default Group;
