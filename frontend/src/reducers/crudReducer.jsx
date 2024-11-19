export const getYReducer = (
  state = { loading: false, success: false, error: false, y: "", message: "" },
  actions
) => {
  switch (actions.type) {
    case "GET_Y_REQUEST":
      return {
        loading: true,
        success: false,
        error: false,
        y: "",
        message: "",
      };
    case "GET_Y_SUCCESS":
      return {
        loading: false,
        success: true,
        error: false,
        y: actions.payload,
        message: "",
      };
    case "GET_Y_FAIL":
      return {
        loading: false,
        success: false,
        error: true,
        y: "",
        message: actions.payload,
      };

    default:
      return state;
  }
};

export const postYreducer = (
  state = { loading: false, success: false, error: false, message: "" },
  actions
) => {
  switch (actions.type) {
    case "POST_Y_REQUEST":
      return { loading: true, success: false, error: false, message: "" };
    case "POST_Y_SUCCESS":
      return { loading: false, success: true, error: false, message: actions.payload };
    case "POST_Y_FAIL": 
      return { loading: false, success: false, error: true, message: actions.payload };
    default:
      return state;
  }
};


export const detailYReducer =  (state = { loading: false, success: false, error: false, message: "" },actions) =>{
  switch (actions.type) {
    case "GET_DETAIL_Y_REQUEST":
      return { loading: true, success: false, error: false, message: "" };
    case "GET_DETAIL_Y_SUCCESS":
      return { loading: false, success: true, error: false, message: actions.payload };
    case "GET_DETAIL_Y_FAIL": 
      return { loading: false, success: false, error: true, message: actions.payload };
    default:
      return state;
}}