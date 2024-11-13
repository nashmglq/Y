import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "../constants/authConstant";
import axios from "axios";

export const loginActions = (formData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const response = await axios.post("http://localhost:5001/login", formData);
    console.log(response);

    if (response.data && response.data.success.userInfo) {
      // response from backend (res.json)
      localStorage.setItem(
        "userInfo",
        JSON.stringify(response.data.success.userInfo)
      );
      console.log(response);
      return dispatch({ type: LOGIN_SUCCESS });
    }
  } catch (err) {
    return dispatch({
      type: LOGIN_FAIL,
      payload:
        err.response && err.response.data && err.response.data.error
          ? err.response.data.error
          : "Something went wrong",
    });
  }
};

export const registerAction = (formData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });
    const response = await axios.post(
      "http://localhost:5001/register",
      formData
    );

    if (response.status === 200) {
      console.log(response);
      return dispatch({ type: REGISTER_SUCCESS, payload: response.data.success });
    }
  } catch (err) {
    // err reposent the "resposne"
    console.log(err.response.data.error);
    return dispatch({
      type: REGISTER_FAIL,
      payload:
        err.response && err.response.data && err.response.data.error
          ? err.response.data.error
          : "Something went wrong",
    });
  }
};
