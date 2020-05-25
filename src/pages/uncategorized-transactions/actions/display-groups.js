import notifications from "../../../components/notifications/actions";
import { checkingAccountAppSvcsUrl } from "../../../../config/settings";
import { token } from "../../../../config/secrets";

export default () => {
  return dispatch => {
    dispatch({
      type: "DISPLAY_GROUPS_PENDING"
    });
    fetch(`${checkingAccountAppSvcsUrl}transactions/uncategorized/grouped`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.status < 200 || response.status > 299) {
          dispatch(
            notifications.addError({
              message:
                "An error occurred on the server getting the transaction groups"
            })
          );
          dispatch({
            type: "DISPLAY_GROUPS_REJECTED"
          });
        }
        response.json().then(result => {
          dispatch({
            type: "DISPLAY_GROUPS_FULFILLED",
            payload: {
              groups: result
            }
          });
        });
      })
      .catch(() => {
        dispatch(
          notifications.addError({
            message:
              "An error occurred on the client getting the transaction groups"
          })
        );
        dispatch({
          type: "DISPLAY_GROUPS_REJECTED"
        });
      });
  };
};
