const express = require('express');
const route = express.Router(); // making this a variable of the function that creates routing
const {registerUser, login, verifyEmail, resendEmailVerification, getPeople, updateProfile} = require('../controller/authentication') // if {} as export, please import as {}
const {postY, getY, updateY, deleteY, getYDetails} = require("../controller/y")
const {authenticatorChecker, upload} = require("../config/middleware")

route.post("/register", registerUser)
route.post("/login", login)
route.get("/verify-email", verifyEmail)
route.post("/resend-email", resendEmailVerification)
route.get("/profile", authenticatorChecker, getPeople)
// .single('profile_image') single upload usng the profile_image being get
route.patch("/profile-update", authenticatorChecker, upload.single('profile_image') ,updateProfile)
route.post("/post-y", authenticatorChecker, upload.single("tweet_img"), postY)
route.get("/get-y", authenticatorChecker,  getY)
route.get("/get-y/:id", authenticatorChecker, getYDetails)
route.patch("/update-y/:id", authenticatorChecker,  updateY)
route.delete("/delete-y/:id", authenticatorChecker,  deleteY)


module.exports = route;
