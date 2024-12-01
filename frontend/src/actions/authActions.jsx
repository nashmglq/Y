import {
  FOLLOW_FAIL,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  GET_PROFILE_FAIL,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_USER_REQUEST,
  GET_PROFILE_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  RESEND_VERIFY_EMAIL_FAIL,
  RESEND_VERIFY_EMAIL_REQUEST,
  RESEND_VERIFY_EMAIL_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
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
      // stringify to object to strings
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
      return dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data.success,
      });
    }
  } catch (err) {
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

export const getProfileActions = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PROFILE_REQUEST });
    // parse strings to json
    const getToken = JSON.parse(localStorage.getItem("userInfo"));
    const token = getToken ? getToken.token : null;
    console.log(getToken);
    console.log(getToken.token);
    const config = token
      ? {
          headers: {
            // "Content-type": "application/json", // having (-) you need "" because object does not take (-)
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      : null;

    const response = await axios.get("http://localhost:5001/profile", config);
    console.log(response.data.success.userInfo);
    if (response.data && response.data.success.userInfo) {
      console.log(response.data.success.userInfo);
      return dispatch({
        type: GET_PROFILE_SUCCESS,
        payload: response.data.success.userInfo,
      });
    }
  } catch (err) {
    return dispatch({
      type: GET_PROFILE_FAIL,
      payload:
        err.response.data && err.response.data.error
          ? err.response.data.error
          : "Something Went Wrong",
    });
  }
};

export const updateProfileAction = (formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const getToken = JSON.parse(localStorage.getItem("userInfo"));
    const token = getToken ? getToken.token : null;

    const config = token
      ? {
          headers: {
            // "Content-type": "application/json", no need for this when handling data, it will set it's own
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      : null;

    const response = await axios.patch(
      "http://localhost:5001/profile-update",
      formData,
      config
    ); // so (url, data, headers)

    if (response.data && response.data.success) {
      dispatch(getProfileActions());
      return dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: response.data.success,
      });
    }
  } catch (err) {
    return dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload:
        //catch (basket) we represent it by err, this contain the whole error
        err.response && err.response.data.error
          ? err.response.data.error
          : "Something went wrong.",
    });
  }
};

export const getUserIdActions = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_PROFILE_USER_REQUEST });

    const getToken = JSON.parse(localStorage.getItem("userInfo"));
    const token = getToken ? getToken.token : null;
    const config = token
      ? {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      : null;

    const response = await axios.get(
      `http://localhost:5001/profile/${id}`,
      config
    );

    if (response.data && response.data.success) {
      console.log(response.data.success);
      return dispatch({
        type: GET_PROFILE_USER_SUCCESS,
        payload: response.data.success,
      });
    }
  } catch (err) {
    return dispatch({
      type: GET_PROFILE_FAIL,
      payload:
        err.response.data && err.response.data.error
          ? err.response.data.error
          : "Something went wrong.",
    });
  }
};

export const followActions = (id) => async (dispatch) => {
  try {
    dispatch({ type: FOLLOW_REQUEST });

    const getToken = JSON.parse(localStorage.getItem("userInfo"));
    const token = getToken ? getToken.token : null;
    const config = token
      ? {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      : null;
      console.log(id)

    const response = await axios.post(
      `http://localhost:5001/follow/${id}`,
      {},
      config
    );

    if (response.data && response.data.success) {
      return dispatch({ type: FOLLOW_SUCCESS, payload: response.data.success });
    }
  } catch (err) {
    return dispatch({
      type: FOLLOW_FAIL,
      payload: err.response.data
        ? err.response.data.error
        : "Something went wrong.",
    });
  }
};
