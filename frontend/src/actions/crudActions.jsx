import {
  GET_Y_REQUEST,
  GET_Y_SUCCESS,
  GET_Y_FAIL,
  POST_Y_REQUEST,
  POST_Y_SUCCESS,
  POST_Y_FAIL,
  GET_DETAIL_Y_REQUEST,
  GET_DETAIL_Y_SUCCESS,
  GET_DETAIL_Y_FAIL,
  DELETE_Y_REQUEST,
  DELETE_Y_SUCCESS,
  DELETE_Y_FAIL,
  UPDATE_Y_REQUEST,
  UPDATE_Y_SUCCESS,
  UPDATE_Y_FAIL,
} from "../constants/crudConstants";
import axios from "axios";

export const getYActions = () => async (dispatch) => {
  try {
    dispatch({ type: GET_Y_REQUEST });

    const getUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    const getToken = getUserInfo ? getUserInfo.token : null;

    const config = getToken
      ? {
          headers: {
            Accept: "applicaiton/json",
            Authorization: `Bearer ${getToken}`,
          },
        }
      : null;

    const response = await axios.get("http://localhost:5001/get-y", config);

    if (response.data && response.data.success.getTweets) {
      return dispatch({
        type: GET_Y_SUCCESS,
        payload: response.data.success.getTweets,
      });
    }
  } catch (err) {
    // err = basket, inside basket contain err.resposne which we could pick
    return dispatch({
      type: GET_Y_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : "Something went wrong!",
    });
  }
};

export const postYActions = (formData) => async (dispatch) => {
  try {
    dispatch({ type: POST_Y_REQUEST });

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
    console.log(formData);
    const response = await axios.post(
      "http://localhost:5001/post-y",
      formData,
      config
    );

    if (response.data && response.data.success) {
      dispatch(getYActions());
      return dispatch({ type: POST_Y_SUCCESS, payload: response.data.success });
    }
  } catch (err) {
    return dispatch({
      type: POST_Y_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : "Something went wrong",
    });
  }
};

export const detailYActions = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_DETAIL_Y_REQUEST });

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

    const resposne = await axios.get(
      `http://localhost:5001/get-y/${id}`,
      config
    );

    if (resposne.data && resposne.data.success) {
      return dispatch({
        type: GET_DETAIL_Y_SUCCESS,
        payload: resposne.data.success,
      });
    }
  } catch (err) {
    return dispatch({
      type: GET_DETAIL_Y_FAIL,
      payload:
        err.resposne && err.resposne.data.error
          ? err.resposne.data.error
          : "Something went wrong",
    });
  }
};

export const deleteYActions = (id, nav) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_Y_REQUEST });

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

    const response = await axios.delete(
      `http://localhost:5001/delete-y/${id}`,
      config
    );

    if (response.data && response.data.success) {
      dispatch(detailYActions());
      nav("/home");
      return dispatch({
        type: DELETE_Y_SUCCESS,
        payload: response.data.success,
      });
    }
  } catch (err) {
    return dispatch({
      type: DELETE_Y_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : "Something went wrong",
    });
  }
};

export const updateYAction = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_Y_REQUEST });

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

      console.log(id, formData, config)

    const response = await axios.patch(
      `http://localhost:5001/update-y/${id}`,
      formData,
      config
    );

    console.log(response)

    if (response.data && response.data.success) {
      dispatch(detailYActions(id));
      return dispatch({
        type: UPDATE_Y_SUCCESS,
        payload: response.data.success,
      });
    }
  } catch (err) {
    return dispatch({
      type: UPDATE_Y_FAIL,
      payload:
        err.response && err.response.data
          ? err.response.data.error
          : "Something went wrong!",
    });
  }
};