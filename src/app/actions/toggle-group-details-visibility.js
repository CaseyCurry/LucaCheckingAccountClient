export default (phrase) => {
  return {
    type: "TOGGLE_GROUP_DETAILS_VISIBILITY",
    payload: phrase
  };
};
