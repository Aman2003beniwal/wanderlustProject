 const { model } = require("mongoose");
const User=require("../models/user");

module.exports.signupUserForm= (req, res) => {
    res.render("user/signup.ejs")
}


module.exports.signup=async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ email, username });
        let registerUser = await User.register(newUser, password);
        // console.log(registerUser);

        //// automatically login  user after signup
        req.login(registerUser, (err) => {
            if (err) {
               return next(err);
            }
            req.flash("success", "Welcome to Wanderlust");
            res.redirect("/listing");
        })
    } catch (err) {
        req.flash("remove", err.message);
        res.redirect("/signup");
    }
}


module.exports.loginUserForm=(req, res) => {
    res.render("user/login.ejs");
}

module.exports.login=async(req, res) => {
    req.flash("success", "Welcome Back To Wanderlust!");
    //// when we are directly login then the res.locals.redirectUrl is empty so then it occur error. to remove that we try
    let redirectUrl= res.locals.redirectUrl || "/listing";
    res.redirect(redirectUrl);
}

module.exports.logout= (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are logged out!");
        res.redirect("/listing");
    })
}