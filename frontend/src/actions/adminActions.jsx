import axios from "axios";
import {
  ADMIN_CHECKER_FAIL,
  ADMIN_CHECKER_REQUEST,
  ADMIN_CHECKER_SUCCESS,
  ADMIN_DELETE_USER_FAIL,
  ADMIN_DELETE_USER_REQUEST,
  ADMIN_DELETE_USER_SUCCESS,
  ADMIN_SUSPEND_USER_FAIL,
  ADMIN_SUSPEND_USER_REQUEST,
  ADMIN_SUSPEND_USER_SUCCESS,
  ADMIN_USER_LIST_FAIL,
  ADMIN_USER_LIST_REQUEST,
  ADMIN_USER_LIST_SUCCESS,
  OPTIMISTIC_SUSPEND_LIST_UPDATE,
  OPTIMISTIC_SUSPEND_UPDATE,
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

export const adminListOfUserActions = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_USER_LIST_REQUEST });

    const getToken = JSON.parse(localStorage.getItem("userInfo"));
    const token = getToken ? getToken.token : null;
    const config = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      : null;

    const response = await axios.get(
      "http://localhost:5001/admin-user-list",
      config
    );

    if (response.data && response.data.success) {
      return dispatch({
        type: ADMIN_USER_LIST_SUCCESS,
        payload: response.data.success,
      });
    }
  } catch (err) {
    return dispatch({
      type: ADMIN_USER_LIST_FAIL,
      payload:
        err.response && err.response.data
          ? err.response.data.error
          : "Something went wrong!",
    });
  }
};

export const AdminDeleteUserActions = (id) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_DELETE_USER_REQUEST });

    const getToken = JSON.parse(localStorage.getItem("userInfo"));
    const token = getToken ? getToken.token : null;
    const config = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      : null;

    const response = await axios.delete(
      `http://localhost:5001/admin/delete-user/${id}`,
      config
    );

    if (response.data && response.data.success) {
      dispatch({
        type: ADMIN_DELETE_USER_SUCCESS,
        payload: response.data.success,
      });
    }
  } catch (err) {
    dispatch({
      type: ADMIN_DELETE_USER_FAIL,
      payload:
        err.response.data && err.response.data.error
          ? err.response.data.error
          : "Something went wrong!",
    });
  }
};

export const AdminUserSuspendAction = (id) => async (dispatch) => {
  try {
    dispatch({type: OPTIMISTIC_SUSPEND_UPDATE, payload: {id} })
  
    dispatch({type: ADMIN_SUSPEND_USER_REQUEST })
    const getToken = JSON.parse(localStorage.getItem("userInfo"));
    const token = getToken ? getToken.token : null;
    const config = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      : null;

    const response = await axios.put(
      `http://localhost:5001/admin/suspend/${id}`,[],
      config
    );

    if (response.data && response.data.success) {
      // console.log(response.data.success)
      return dispatch({
        type: ADMIN_SUSPEND_USER_SUCCESS,
        payload: response.data.success,
      });
    }
  } catch (err) {
    dispatch({type: OPTIMISTIC_SUSPEND_LIST_UPDATE, payload: {id}})
    return dispatch({
      type: ADMIN_SUSPEND_USER_FAIL,
      payload:
        err.response.data && err.response.data.error
          ? err.response.data.error
          : "Something went wrong!",
    });


  }
};
