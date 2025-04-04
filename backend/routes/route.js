const express = require("express");
const route = express.Router(); // making this a variable of the function that creates routing
const {
  registerUser,
  login,
  verifyEmail,
  resendEmailVerification,
  getPeople,
  updateProfile,
  getIdUser,
  getFollowers,
  follow,
  getFollowing,
  getFollowInt,
  checkForFollow,
  checkUserLike,
  usersFollowers,
  updatePassword,
} = require("../controller/authentication"); // if {} as export, please import as {}
const {
  postY,
  getY,
  updateY,
  deleteY,
  getYDetails,
  updateLike,
  getUserY,
  postComment,
  getCountOfLikes,
  getOtherY,
  getComments,
  deleteComments,
  updateComments,
  repostY,
  searchY,
} = require("../controller/y");

const { authenticatorChecker, upload } = require("../config/middleware");
const { adminChecker, adminUserList, adminDeleteUser, suspendAdminUser, searchUserAdmin, setAdmin } = require("../controller/admin");

route.post("/register", registerUser);
route.post("/login", login);
route.get("/verify-email", verifyEmail);
route.post("/resend-email", resendEmailVerification);
route.get("/profile", authenticatorChecker, getPeople);
route.patch(
  "/profile-update",
  authenticatorChecker,
  upload.single("profile_image"),
  updateProfile
);
route.post("/post-y", authenticatorChecker, upload.single("tweet_img"), postY);
route.get("/get-y", authenticatorChecker, getY);
route.get("/get-y/:id", authenticatorChecker, getYDetails);
route.patch("/update-y/:id", authenticatorChecker, updateY);
route.delete("/delete-y/:id", authenticatorChecker, deleteY);
route.patch("/update-like/:id", authenticatorChecker, updateLike);
route.get("/get-user-y", authenticatorChecker, getUserY);
route.get("/like-count/:id", authenticatorChecker, getCountOfLikes);
route.post("/comment/:id", authenticatorChecker, postComment);
route.get("/comment/:id", authenticatorChecker, getComments);
route.delete("/comment/:id", authenticatorChecker, deleteComments);
route.put("/comment/:id", authenticatorChecker, updateComments);
route.get("/profile/:id", authenticatorChecker, getIdUser);
route.get("/get-user-other/:id", authenticatorChecker, getOtherY);
route.get("/get-following/", authenticatorChecker, getFollowing);
route.post("/follow/:id", authenticatorChecker, follow);
route.get("/get-followers", authenticatorChecker, getFollowInt);
route.get("/check-if-follow/:id", authenticatorChecker, checkForFollow);
route.get("/check-user-like/:id", authenticatorChecker, checkUserLike);
route.get("/get-other-followers/:id", authenticatorChecker, usersFollowers);
route.post("/repost/:id", authenticatorChecker, repostY);
route.put("/update/password", authenticatorChecker, updatePassword);
route.get("/admin-checker", authenticatorChecker, adminChecker);
route.get("/admin-user-list", authenticatorChecker, adminUserList);
route.delete("/admin/delete-user/:id", authenticatorChecker, adminDeleteUser);
route.put("/admin/suspend/:id", authenticatorChecker, suspendAdminUser)
route.post("/get-y-query", authenticatorChecker, searchY)
route.post("/admin-search-user", authenticatorChecker, searchUserAdmin)
route.put("/admin-setter/:id", authenticatorChecker, setAdmin)
module.exports = route;
