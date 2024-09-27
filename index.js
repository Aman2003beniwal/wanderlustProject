//require .env file
if(process.env.NODE_ENV !="production"){
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const session= require("express-session");
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");

//// require ejs-mate
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);

////require ejs
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

//// to add statice file like public
app.use(express.static(path.join(__dirname, "/public")))

////require method-override to overloop the method of form like post to put,delete,patch =======================
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

//// require the ExpressError to create over owb error by providing statuscode and message
const ExpressError = require("./utlis/ExpressError.js");


//// require passport and user schema ==========================================
const passport= require("passport")
const LocalStrategy=require("passport-local");
const User= require("./models/user.js");

 const dbUrl=process.env.ALTAS_URL;

main().then((res) => { 
    console.log("successfully connection with mongodb");
}).catch((err) => {
    console.log(err);
});

// connection with mongodatabase
async function main() {
    await mongoose.connect(dbUrl);   
}

////mongo session store
const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*60*60,
})

store.on("error",()=>{
    console.log("ERROR IN MONGO SESSION STORE",error);
})
//session set
const sessionOption={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+3*24*60*60*1000,
        maxAge:3*24*60*60*1000,
        httpOnly:true
    }
};



//session used
app.use(session(sessionOption));
////using flash ============================================
app.use(flash());

////implement passport =======================================
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//using flash by delcareing middleware
app.use((req,res,next)=>{
res.locals.success=req.flash("success");
res.locals.error=req.flash("error");
res.locals.currUser=req.user;
 next();
});

//// restructing router 
const listingRouter=require("./routes/listing.js");
app.use("/listing",listingRouter);


//// destructring reviews
const reviewRouter=require("./routes/review.js");
app.use("/listing/:id/reviews",reviewRouter);

////user router
const userRouter=require("./routes/user.js");
const { error } = require('console');
app.use("/",userRouter);


//// when over request is not match any url then we are creating a request for all request that is send by user and handle that request to prevent the error then we used ExpressError to throw the error and prevent the file crashed.
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found!"));
})
//// creating a ExpressError
app.use((err, req, res, next) => {
    let { status = 500, message = "Something went wrong!..." } = err;
    res.status(status).render("error.ejs", { err });
    // res.status(status).send(message);

})

app.listen(8080, () => {
    console.log("app is listen port 8080");
})