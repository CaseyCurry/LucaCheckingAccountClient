export default subcategory => {
  return {
    type: "SELECT_SUBCATEGORY",
    payload: {
      subcategory
    }
  };
};
