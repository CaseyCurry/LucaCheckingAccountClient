import notifications from "../../../components/notifications/actions";

export default (originalTransaction, splitAmount) => {
  return dispatch => {
    dispatch({
      type: "COMPLETE_SPLIT_PENDING"
    });
    // TODO: move base url to config
    fetch(
      `http://localhost:8080/api/commands/transactions/states/uncategorized/${
        originalTransaction.id
      }/split/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // TODO: make dynamic
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJMdWNhIiwiaWF0IjoxNTQ5MTI3NjM0LCJleHAiOjE3Mzg1MTY0MzQsImF1ZCI6Ind3dy5sdWNhLmNvbSIsInN1YiI6ImFkbWluQGx1Y2EuY29tIiwidGVuYW50IjoiMWE4NDU2OTQtMmU5Zi00NjE5LWFhNDItNmU1YmMyMzk0ODkzIn0.96bLe6CMoqIaQ7u8VIAq-YvsDHusSeXEUL0M6MGz5FU"
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
