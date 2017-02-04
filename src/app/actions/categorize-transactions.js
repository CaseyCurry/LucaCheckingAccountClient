export default (api, findUncategorizedTransactions) => {
  return (category, transactions) => {
    return (dispatch) => {
      transactions = transactions.map(transaction => {
        return {
          id: transaction.id,
          categorization: {
            [category]: transaction.amount
          }
        };
      });
      return {
        type: "CATEGORIZE_TRANSACTIONS",
        payload: api.getUrl()
          .then(url => {
            return api.client
              .post(url, {
                transactions
              }, {
                headers: {
                  "Content-Type": "application/json"
                }
              })
              .then(() => {
                dispatch(findUncategorizedTransactions());
              })
              .catch((error) => {
                Promise.reject(error);
              });
          })
          .catch(error => {
            Promise.reject(error);
          })
      };
    };
  };
};
