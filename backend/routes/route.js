const express = require('express');
const route = express.Router(); // making this a variable of the function that creates routing
const {registerUser, login, verifyEmail, resendEmailVerification} = require('../controller/authentication') // if {} as export, please import as {}


route.post("/register", registerUser)
route.post("/login", login)
route.get("/verify-email", verifyEmail)
route.post("/resend-email", resendEmailVerification)



module.exports = route;