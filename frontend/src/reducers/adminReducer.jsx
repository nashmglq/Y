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
export const adminListOfUserReducer = (
  state = { loading: false, success: false, error: false, message: "" },
  actions
) => {
  switch (actions.type) {
    case "ADMIN_USER_LIST_REQUEST":
      return { loading: true, success: false, error: false };
    case "ADMIN_USER_LIST_SUCCESS":
      return {
        loading: true,
        success: true,
        error: false,
        message: actions.payload,
      };
    case "ADMIN_USER_LIST_FAIL":
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

export const AdminDeleteUserReducer = (
  initialState = { loading: false, success: false, error: false, message: "" },
  actions
) => {
  switch (actions.type) {
    case "ADMIN_DELETE_USER_REQUEST":
      return { loading: true, success: false, error: false, message: "" };
    case "ADMIN_DELETE_USER_SUCCESS":
      return {
        loading: false,
        success: true,
        error: false,
        message: actions.payload,
      };
    case "ADMIN_DELETE_USER_FAIL":
      return {
        loading: false,
        success: false,
        error: true,
        message: actions.payload,
      };
    default:
      return initialState;
  }
};

export const AdminSuspendUserReducer = (
  initialState = { loading: false, success: false, error: false, message: "" },
  actions
) => {
  switch (actions.type) {
    case "ADMIN_SUSPEND_USER_REQUEST":
      return { loading: true, success: false, error: false, message: "" };
    case "ADMIN_SUSPEND_USER_SUCCESS":
      return {
        loading: false,
        success: true,
        error: false,
        message: actions.payload,
      };
    case "ADMIN_SUSPEND_USER_FAIL":
      return {
        loading: false,
        success: false,
        error: true,
        message: actions.payload,
      };
    default:
      return initialState;
  }
};
