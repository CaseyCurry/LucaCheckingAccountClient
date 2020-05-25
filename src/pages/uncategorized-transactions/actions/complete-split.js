import notifications from "../../../components/notifications/actions";
import { checkingAccountAppSvcsUrl } from "../../../../config/settings";
import { token } from "../../../../config/secrets";

export default (originalTransaction, splitAmount) => {
  return dispatch => {
    dispatch({
      type: "COMPLETE_SPLIT_PENDING"
    });
    fetch(
      `${checkingAccountAppSvcsUrl}transactions/uncategorized/${
        originalTransaction.id
      }/split/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ originalTransaction, amount: splitAmount })
      }
    )
      .then(response => {
        if (response.status < 200 || response.status > 299) {
          dispatch(
            notifications.addError({
              message:
                "An error occurred on the server splitting the transactions"
            })
          );
          dispatch({
            type: "COMPLETE_SPLIT_REJECTED"
          });
        }
        response.json().then(result => {
          dispatch({
            type: "COMPLETE_SPLIT_FULFILLED",
            payload: {
              originalTransaction: result.originalTransaction,
              newTransaction: result.newTransaction
            }
          });
        });
      })
      .catch(() => {
        dispatch(
          notifications.addError({
            message:
              "An error occurred on the client splitting the transactions"
          })
        );
        dispatch({
          type: "COMPLETE_SPLIT_REJECTED"
        });
      });
  };
};
