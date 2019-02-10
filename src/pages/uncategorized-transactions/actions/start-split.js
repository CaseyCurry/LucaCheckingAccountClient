export default transaction => {
  return {
    type: "START_SPLIT",
    payload: transaction
  };
};
