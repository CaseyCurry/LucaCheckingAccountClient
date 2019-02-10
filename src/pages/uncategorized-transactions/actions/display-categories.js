import notifications from "../../../components/notifications/actions";

export default phrase => {
  return dispatch => {
    dispatch({
      type: "DISPLAY_CATEGORIES_PENDING",
      payload: {
        phrase
      }
    });
    // TODO: move base url to config
    fetch("http://localhost:8082/api/categories")
      .then(response => {
        if (response.status < 200 || response.status > 299) {
          dispatch(
            notifications.addError({
              message: "An error occurred on the server getting the categories"
            })
          );
          dispatch({
            type: "DISPLAY_CATEGORIES_REJECTED",
            payload: {
              phrase
            }
          });
        }
        response.json().then(result => {
          dispatch({
            type: "DISPLAY_CATEGORIES_FULFILLED",
            payload: {
              phrase,
              categories: result
            }
          });
        });
      })
      .catch(() => {
        dispatch(
          notifications.addError({
            message: "An error occurred on the client getting the categories"
          })
        );
        dispatch({
          type: "DISPLAY_CATEGORIES_REJECTED",
          payload: {
            phrase
          }
        });
      });
  };
};
