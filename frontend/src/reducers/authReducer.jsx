import { act } from "react";

const initialState = {
  loading: false,
  success: false,
  error: false,
  message: "",
};

export const loginReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case "LOGIN_REQUEST":
      return { loading: true, success: false, error: false };
    case "LOGIN_SUCCESS":
      return {
        loading: false,
        success: true,
        error: false,
        message: actions.payload,
      };
    case "LOGIN_FAIL":
      return {
        loading: false,
        success: false,
        error: true,
        message: actions.payload,
      };
    default:
      return state;
  }
};

export const registerReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case "REGISTER_REQUEST":
      return { loading: true, success: false, error: false };
    case "REGISTER_SUCCESS":
      return {
        loading: false,
        success: true,
        error: false,
        message: actions.payload,
      };
    case "REGISTER_FAIL":
      return {
        loading: false,
        success: false,
        error: true,
        message: actions.payload,
      };
    default:
      return state;
  }
};

export const emailVerificationReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case "VERIFY_EMAIL_REQUEST":
      return { loading: true, success: false, error: false };
    case "VERIFY_EMAIL_SUCCESS":
      return {
        loading: false,
        success: true,
        error: false,
        message: actions.payload,
      };
    case "VERIFY_EMAIL_FAIL":
      return {
        loading: false,
        success: false,
        error: true,
        message: actions.payload,
      };
    default:
      return state;
  }
};

export const resendEmailVerificationReducer = (
  state = initialState,
  actions
) => {
  switch (actions.type) {
    case "RESEND_VERIFY_EMAIL_REQUEST":
      return { loading: true, success: false, error: false };
    case "RESEND_VERIFY_EMAIL_SUCCESS":
      return {
        loading: false,
        success: true,
        error: false,
        message: actions.payload,
      };
    case "RESEND_VERIFY_EMAIL_FAIL":
      return {
        loading: false,
        success: false,
        error: true,
        message: actions.payload,
      };
    default:
      return state;
  }
};

export const getProfileReducer = (
  state = {
    loading: false,
    success: false,
    error: false,
    profile: "",
    message: "",
  },
  actions
) => {
  switch (actions.type) {
    case "GET_PROFILE_REQUEST":
      return { loading: true, success: false, error: false };
    case "GET_PROFILE_SUCCESS":
      return {
        loading: false,
        success: true,
        error: false,
        profile: actions.payload,
      };
    case "GET_PROFILE_FAIL":
      return {
        loading: false,
        success: false,
        error: true,
        message: actions.payload,
      };
    default:
      return state;
  }
};

export const updateProfileReducer = (
  state = { loading: false, success: false, error: false, message: "" },
  actions
) => {
  switch (actions.type) {
    case "UPDATE_PROFILE_REQUEST":
      return { loading: true, success: false, error: false };
    case "UPDATE_PROFILE_SUCCESS":
      return { loading: false, success: true, error: false, message: actions.payload};
    case "UPDATE_PROFILE_FAIL":
      return { loading: false, success: false, error: true, message: actions.payload};
    default:
      return state;
  }
};