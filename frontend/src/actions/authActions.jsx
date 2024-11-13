import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  RESEND_VERIFY_EMAIL_FAIL,
  RESEND_VERIFY_EMAIL_REQUEST,
  RESEND_VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAIL,
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
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
      return dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data.success,
      });
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

export const emailVerifyAction = (token) => async (dispatch) => {
  try {
    dispatch({ type: VERIFY_EMAIL_REQUEST });

    // use query and not params
    const response = await axios.get(
      `http://localhost:5001/verify-email?token=${token}`
    );
    console.log(response);

    if (response.data && response.data.success) {
      return dispatch({
        type: VERIFY_EMAIL_SUCCESS,
        payload: response.data.success,
      });
    }
  } catch (err) {
    return dispatch({
      type: VERIFY_EMAIL_FAIL,
      payload:
        err.response.data && err.response.data.error
          ? err.response.data.error
          : "Something went wrong",
    });
  }
};

export const resendEmailVerificationAction = (email) => async (dispatch) => {
  try {
    dispatch({ type: RESEND_VERIFY_EMAIL_REQUEST });
    const response = await axios.post(
      "http://localhost:5001/resend-email",
      email
    );

    if (response.data && response.data.success) {
      return dispatch({
        type: RESEND_VERIFY_EMAIL_SUCCESS,
        payload: response.data.success,
      });
    } 
  } catch (err) {
    return dispatch({
      type: RESEND_VERIFY_EMAIL_FAIL,
      payload:
        err.response.data && err.response.data.error
          ? err.response.data.error
          : "Something went wrong",
    });
  }
};
