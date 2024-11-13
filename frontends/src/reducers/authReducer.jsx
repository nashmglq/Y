export const loginReducer = (state = { initialState: [] }, actions) => {
  switch (actions.type) {
    case "LOGIN_REQUEST":
      return { loading: true, success: false, error: false };
    case "LOGIN_SUCCESS":
      return { loading: false, success: true, error: false };
    case "LOGIN_FAIL":
      return { loading: false, success: false, error: true };
    default:
      return state;
  }
};

export const registerReducer = (state = {  loading: true, success: false, error: false }, actions) => {
  switch (actions.type) {
    case "REGISTER_REQUEST":
      return { loading: true, success: false, error: false };
    case "REGISTER_SUCCESS":
      return { loading: false, success: true, error: false, message: actions.payload };
    case "REGISTER_FAIL":
      return { loading: false, success: false, error: true, message: actions.payload};
    default:
      return state;
  }
};
