export default (phrase) => {
  return {
    type: "TOGGLE_CATEGORIES_VISIBILITY",
    payload: phrase
  };
};
