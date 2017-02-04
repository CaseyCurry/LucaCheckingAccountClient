export default (phrase, transactionId) => {
  return {
    type: "TOGGLE_TRANSACTION_SELECTION",
    payload: {
      phrase,
      transactionId
    }
  };
};
