import notifications from "../../../components/notifications/actions";
import { checkingAccountAppSvcsUrl } from "../../../../config/settings";
import { token } from "../../../../config/secrets";

export default (subcategoryId, transactionIds) => {
  return dispatch => {
    dispatch({
      type: "CATEGORIZE_PENDING"
    });
    fetch(`${checkingAccountAppSvcsUrl}transactions/categorized`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        categorization: subcategoryId,
        transactions: transactionIds
      })
    })
      .then(response => {
        if (response.status < 200 || response.status > 299) {
          dispatch(
            notifications.addError({
              message:
                "An error occurred on the server categorizing the transactions"
            })
          );
          dispatch({
            type: "CATEGORIZE_REJECTED"
          });
        }
        dispatch({
          type: "CATEGORIZE_FULFILLED"
        });
      })
      .catch(() => {
        dispatch(
          notifications.addError({
            message:
              "An error occurred on the client categorizing the transactions"
          })
        );
        dispatch({
          type: "CATEGORIZE_REJECTED"
        });
      });
  };
};
