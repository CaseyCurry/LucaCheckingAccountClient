const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FIND_CATEGORIES_FULFILLED":
      {
        return action.payload.data;
      }
  }

  return state;
};
