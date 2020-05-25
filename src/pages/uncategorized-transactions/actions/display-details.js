import notifications from "../../../components/notifications/actions";
import { checkingAccountAppSvcsUrl } from "../../../../config/settings";
import { token } from "../../../../config/secrets";

export default (phrase, ids) => {
  return dispatch => {
    dispatch({
      type: "DISPLAY_DETAILS_PENDING",
      payload: {
        phrase
      }
    });
    // TODO: move base url to config
    fetch(`${checkingAccountAppSvcsUrl}transactions/ids`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(ids)
    })
      .then(response => {
        if (response.status < 200 || response.status > 299) {
          dispatch(
            notifications.addError({
              message:
                "An error occurred on the server getting the transactions"
            })
          );
          dispatch({
            type: "DISPLAY_DETAILS_REJECTED",
            payload: {
              phrase
            }
          });
        }
        response.json().then(result => {
          dispatch({
            type: "DISPLAY_DETAILS_FULFILLED",
            payload: {
              phrase,
              details: result
            }
          });
        });
      })
      .catch(() => {
        dispatch(
          notifications.addError({
            message: "An error occurred on the client getting the transactions"
          })
        );
        dispatch({
          type: "DISPLAY_DETAILS_REJECTED",
          payload: {
            phrase
          }
        });
      });
  };
};
