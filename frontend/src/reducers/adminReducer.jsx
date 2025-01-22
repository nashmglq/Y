export const adminCheckerReducer = (
  state = { loading: false, success: false, error: false, message: "" },
  actions
) => {
  switch (actions.type) {
    case "ADMIN_CHECKER_REQUEST":
      return { loading: true, success: false, error: false };
    case "ADMIN_CHECKER_SUCCESS":
      return {
        loading: false,
        success: true,
        error: false,
        message: actions.payload,
      };
    case "ADMIN_CHECKER_FAIL":
      return {
        loading: false,
        success: false,
        error: false,
        message: actions.payload,
      };
    default:
      return state;
  }
};
