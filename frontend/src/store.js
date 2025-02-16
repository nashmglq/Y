import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import {
  changePasswordReducer,
  checkIfFollowReducer,
  emailVerificationReducer,
  followReducer,
  getProfileReducer,
  getUserIdReducer,
  loginReducer,
  OtherUserFollowersReducer,
  registerReducer,
  resendEmailVerificationReducer,
  updateProfileReducer,
} from "./reducers/authReducer";
import {
  changePasswordActions,
  emailVerifyAction,
} from "./actions/authActions";
import {
  checkDetailLikeReducer,
  deleteCommentReducer,
  deleteYReducer,
  detailYReducer,
  getCommentReducer,
  getUserYOtherReducer,
  getUserYReducer,
  getYReducer,
  likeCountReducer,
  likeReducer,
  postCommentReducer,
  postYreducer,
  updateCommentReducer,
  updateYReducer,
} from "./reducers/crudReducer";
import { adminCheckerReducer, AdminDeleteUserReducer, adminListOfUserReducer, AdminSuspendUserReducer } from "./reducers/adminReducer";


// put all reducers here
const reducer = combineReducers({
  loginUser: loginReducer,
  registerUser: registerReducer,
  emailVerify: emailVerificationReducer,
  resendEmailVerification: resendEmailVerificationReducer,
  getProfile: getProfileReducer,
  updateProfile: updateProfileReducer,
  getY: getYReducer,
  detailY: detailYReducer,
  postY: postYreducer,
  deleteY: deleteYReducer,
  updateY: updateYReducer,
  likeY: likeReducer,
  getUserY: getUserYReducer,
  likeCount: likeCountReducer,
  getUserId: getUserIdReducer,
  getUserYOther: getUserYOtherReducer,
  follow: followReducer,
  checkIfFollow: checkIfFollowReducer,
  checkDetailLike: checkDetailLikeReducer,
  postComment: postCommentReducer,
  getComment: getCommentReducer,
  updateComment: updateCommentReducer,
  deleteComment: deleteCommentReducer,
  OtherUserFollowers: OtherUserFollowersReducer,
  changePassword: changePasswordReducer,
  adminChecker : adminCheckerReducer,
  adminListOfUser : adminListOfUserReducer,
  AdminDeleteUser : AdminDeleteUserReducer,
  AdminSuspendUser : AdminSuspendUserReducer
});

const intialState = {}; // initial state which can be used in our reducers

// User likes the post -> USER_REQUEST action triggers middleware
// -> Thunk checks everything (e.g., user login) before sending the like request to the backend
// -> If all good, backend updates and boom! Like count is updated on the frontend.

const middleware = [thunk];

const store = configureStore({
  // put all here to export everthing
  reducer,
  intialState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

export default store;
