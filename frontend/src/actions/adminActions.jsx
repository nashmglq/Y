import axios from "axios";
import {
  ADMIN_CHECKER_FAIL,
  ADMIN_CHECKER_REQUEST,
  ADMIN_CHECKER_SUCCESS,
} from "../constants/adminConstant";

export const adminCheckerActions = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_CHECKER_REQUEST });

    const getToken = JSON.parse(localStorage.getItem("userInfo"));
    const token = getToken ? getToken.token : null;
    const config = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "Application/json",
          },
        }
      : null;

    const response = await axios.get(
      "http://localhost:5001/admin-checker",
      config
    );

    if (response.data && response.data.success) {
      return dispatch({
        type: ADMIN_CHECKER_SUCCESS,
        payload: response.data.success,
      });
    }
  } catch (err) {
    return dispatch({
      type: ADMIN_CHECKER_FAIL,
      payload:
        err.response.data && err.response.data.message
          ? err.response.data.message
          : "Something went wrong",
    });
  }
};
