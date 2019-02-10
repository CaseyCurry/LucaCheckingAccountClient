import notifications from "../../../components/notifications/actions";

export default (newAmount, originalAmount) => {
  return dispatch => {
    const minAmount = 0.01;
    const maxAmount = originalAmount - 0.01;
    if (
      isNaN(newAmount) ||
      parseFloat(newAmount) < minAmount ||
      parseFloat(newAmount) > maxAmount
    ) {
      dispatch(
        notifications.addError({
          message: "An invalid number was entered"
        })
      );
      dispatch({
        type: "CHANGE_SPLIT_AMOUNT_REJECTED"
      });
    } else {
      dispatch({
        type: "CHANGE_SPLIT_AMOUNT_FULFILLED",
        payload: parseFloat(newAmount)
      });
    }
  };
};
