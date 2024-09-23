const express = require("express");
const User = require("../models/user.js");
const wrapAsync = require("../utlis/wrapAsync");
const passport = require('passport');
const { saveRedirectUrl } = require("../middleware.js");
const router = express.Router();
const userController=require("../controllers/user.js");

////router.route is used to remove the duplicate route
router.route("/signup")
.get( userController.signupUserForm)
.post( wrapAsync(userController.signup))


router.route("/login")
.get(userController.loginUserForm)
.post(saveRedirectUrl,passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),userController.login);

////logout route by using passport
router.get("/logout",userController.logout)


module.exports = router;