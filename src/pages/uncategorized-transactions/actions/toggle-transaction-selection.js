export default id => {
  return {
    type: "TOGGLE_TRANSACTION_SELECTION",
    payload: {
      id
    }
  };
};
