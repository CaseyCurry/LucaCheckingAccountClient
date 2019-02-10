export default category => {
  return {
    type: "SELECT_CATEGORY",
    payload: {
      category
    }
  };
};
