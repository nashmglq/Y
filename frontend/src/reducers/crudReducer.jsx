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

    case "OPTIMISTIC_LIKE_UPDATE":
      return {
        // call state, overwrite y, who action calls reducer will be payload
        // y is payload, it contains all, update the like and heart count, return the whole payload but only for the certain id
        ...state,
        y: state.y.map((tweet) =>
          // actions.payload.id is the {id}
          // this is just to manually do it
          tweet.tweet_id === actions.payload.id
            ? {
                ...tweet,
                isLiked: !tweet.isLiked,
                heart: tweet.isLiked ? tweet.heart - 1 : tweet.heart + 1,
              }
            : tweet
        ),
      };
    case "REVERT_OPTIMISTIC_UPDATE":
      return state;

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
      return {
        loading: false,
        success: true,
        error: false,
        message: actions.payload,
      };
    case "POST_Y_FAIL":
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

export const detailYReducer = (
  state = { loading: false, success: false, error: false, message: "" },
  actions
) => {
  switch (actions.type) {
    case "GET_DETAIL_Y_REQUEST":
      return { loading: true, success: false, error: false, message: "" };
    case "GET_DETAIL_Y_SUCCESS":
      return {
        loading: false,
        success: true,
        error: false,
        message: actions.payload,
      };
    case "GET_DETAIL_Y_FAIL":
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

export const deleteYReducer = (
  state = { loading: false, success: false, error: false, message: "" },
  actions
) => {
  switch (actions.type) {
    case "DELETE_Y_REQUEST":
      return { loading: true, success: false, error: false, message: "" };
    case "DELETE_Y_SUCCESS":
      return {
        loading: false,
        success: true,
        error: false,
        message: actions.payload,
      };
    case "DELETE_Y_FAIL":
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

export const updateYReducer = (
  state = { loading: false, success: false, error: false, message: "" },
  actions
) => {
  switch (actions.type) {
    case "UPDATE_Y_REQUEST":
      return { loading: true, success: false, error: false, message: "" };
    case "UPDATE_Y_SUCCESS":
      return {
        loading: false,
        success: true,
        error: false,
        message: actions.payload,
      };
    case "UPDATE_Y_FAIL":
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

export const likeReducer = (
  state = { loading: false, success: false, error: false, message: "" },
  actions
) => {
  switch (actions.type) {
    case "LIKE_Y_REQUEST":
      return { loading: true, success: false, error: false, message: "" };
    case "LIKE_Y_SUCCESS":
      return {
        loading: false,
        success: true,
        error: false,
        message: actions.payload,
      };
    case "LIKE_Y_FAIL":
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

export const getUserYReducer = (
  state = { loading: false, success: false, error: false, y: [], message: [] },
  actions
) => {
  switch (actions.type) {
    case "GET_USER_Y_REQUEST":
      return { loading: true, success: false, error: false };
    case "GET_USER_Y_SUCCESS":
      return {
        loading: false,
        success: true,
        error: false,
        y: actions.payload,
      };
    case "GET_USER_Y_FAIL":
      return {
        loading: false,
        success: false,
        error: true,
        message: actions.payload,
      };

    case "OPTIMISTIC_LIKE_UPDATE":
      return {
        // call state, overwrite y, who action calls reducer will be payload
        // y is payload, it contains all, update the like and heart count, return the whole payload but only for the certain id
        ...state,
        y: state.y.map((tweet) =>
          // actions.payload.id is the {id}
          // this is just to manually do it
          tweet.tweet_id === actions.payload.id
            ? {
                ...tweet,
                isLiked: !tweet.isLiked,
                heart: tweet.isLiked ? tweet.heart - 1 : tweet.heart + 1,
              }
            : tweet
        ),
      };
    case "REVERT_OPTIMISTIC_UPDATE":
      return state;
    default:
      return state;
  }
};

export const getUserYOtherReducer = (
  state = { loading: false, success: false, error: false, y: [], message: [] },
  actions
) => {
  switch (actions.type) {
    case "GET_USER_Y_OTHER_REQUEST":
      return { loading: true, success: false, error: false };
    case "GET_USER_Y_OTHER_SUCCESS":
      return {
        loading: false,
        success: true,
        error: false,
        y: actions.payload,
      };
    case "GET_USER_Y_OTHER_FAIL":
      return {
        loading: false,
        success: false,
        error: true,
        message: actions.payload,
      };
    case "OPTIMISTIC_LIKE_UPDATE":
      return {
        // call state, overwrite y, who action calls reducer will be payload
        // y is payload, it contains all, update the like and heart count, return the whole payload but only for the certain id
        ...state,
        y: state.y.map((tweet) =>
          // actions.payload.id is the {id}
          // this is just to manually do it
          tweet.tweet_id === actions.payload.id
            ? {
                ...tweet,
                isLiked: !tweet.isLiked,
                heart: tweet.isLiked ? tweet.heart - 1 : tweet.heart + 1,
              }
            : tweet
        ),
      };
    case "REVERT_OPTIMISTIC_UPDATE":
      return state;

    default:
      return state;
  }
};

export const likeCountReducer = (
  state = { loading: false, success: false, erorr: false, count: "" },
  actions
) => {
  switch (actions.type) {
    case "GET_LIKE_COUNT_REQUEST":
      return { loading: true, success: false, error: false };
    case "GET_LIKE_COUNT_SUCCESS":
      return {
        loading: false,
        success: true,
        error: false,
        count: actions.payload,
      };
    case "GET_LIKE_COUNT_FAIL":
      return {
        loading: false,
        success: false,
        error: true,
        count: actions.payload,
      };
    default:
      return state;
  }
};

export const checkDetailLikeReducer = (
  state = { loading: false, success: false, error: false, message: "" },
  actions
) => {
  switch (actions.type) {
    case "CHECK_DETAIL_LIKE_REQUEST":
      return { loading: true, success: false, error: false, message: "" };
    case "CHECK_DETAIL_LIKE_SUCCESS":
      return {
        loading: false,
        success: true,
        error: false,
        message: actions.payload,
      };
    case "CHECK_DETAIL_LIKE_FAIL":
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

export const postCommentReducer = (
  state = { loading: false, success: false, error: false, message: "" },
  actions
) => {
  switch (actions) {
    case "POST_COMMENT_REQUEST":
      return { loading: true, success: false, error: false };
    case "POST_COMMENT_SUCCESS":
      return {
        loading: false,
        success: true,
        error: false,
        message: actions.payload,
      };
    case "POST_COMMENT_FAIL":
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

export const getCommentReducer = (
  state = { loading: false, success: false, error: false, message: "" },
  actions
) => {
  switch (actions.type) {
    case "GET_COMMENT_REQUEST":
      return { loading: true, success: false, error: false };
    case "GET_COMMENT_SUCCESS":
      return {
        loading: false,
        success: true,
        error: false,
        message: actions.payload,
      };
    case "GET_COMMENT_FAIL":
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

export const updateCommentReducer = (
  state = { loading: false, success: false, error: false, message: "" },
  actions
) => {
  switch (actions.type) {
    case "UPDATE_COMMENT_REQUEST":
      return { loading: true, success: false, error: false };
    case "UPDATE_COMMENT_SUCCESS":
      return {
        loading: false,
        success: true,
        error: false,
        message: actions.payload,
      };
    case "UPDATE_COMMENT_FAIL":
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

export const deleteCommentReducer = (
  state = { loading: false, success: false, error: false, message: "" },
  actions
) => {
  switch (actions.type) {
    case "DELETE_COMMENT_REQUEST":
      return { loading: true, success: false, error: false };
    case "DELETE_COMMENT_SUCCESS":
      return {
        loading: false,
        success: true,
        error: false,
        message: actions.payload,
      };
    case "DELETE_COMMENT_FAIL":
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

export const searchYReducer = (
  state = { loading: false, success: false, error: false, message: [] },
  actions
) => {
  switch (actions.type) {
    case "SEARCH_Y_REQUEST":
      return { loading: true, success: false, error: false };

    case "SEARCH_Y_SUCCESS":
      return {
        loading: false,
        success: true,
        error: false,
        message: actions.payload,
      };

    case "SEARCH_Y_FAIL":
      return {
        loading: false,
        success: false,
        error: true,
        message: actions.payload,
      };

      case "OPTIMISTIC_LIKE_UPDATE":
        return {
          // call state, overwrite y, who action calls reducer will be payload
          // y is payload, it contains all, update the like and heart count, return the whole payload but only for the certain id
          ...state,
          message: state.message.map((tweet) =>
            // actions.payload.id is the {id}
            // this is just to manually do it
            tweet.tweet_id === actions.payload.id
              ? {
                  ...tweet,
                  isLiked: !tweet.isLiked,
                  heart: tweet.isLiked ? tweet.heart - 1 : tweet.heart + 1,
                }
              : tweet
          ),
        };
      case "REVERT_OPTIMISTIC_UPDATE":
        return state;
    default:
      return { ...state };
  }
};
