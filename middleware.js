const Listing= require("./models/listing.js");
const Review= require("./models/review.js");
const ExpressError = require("./utlis/ExpressError.js");
const { listingSchema,reviewSchema } = require("./schemaJoi.js");
const review = require("./models/review");
 
module.exports.isLoggedIn=(req,res,next)=>{
 //// to check user is login or not ================
 if(!req.isAuthenticated()){
  //// after login to redirectUrl to page that user want to access ,it appley in login route,when it pass in login route then passport give error to solve that error we describe a new middleware that is define below by name saveRedirectUrl .
  req.session.redirectUrl=req.originalUrl; 
    req.flash("error","You must be login to create a new listing!");
   return res.redirect("/login"); 
 }
 next(); 
}

////slove the error that is occur when we direct pass value in login route  we creating a middleware=>
module.exports.saveRedirectUrl=(req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl;
  }
  next();
};

 //// checking the owner to update and delete listing 
module.exports.isOwner=async(req,res,next)=>{
  let { id } = req.params;
  let listing= await Listing.findById(id);
  ////before the delete listing checking listing owner and currUser are same or not .
  if(!listing.owner._id.equals(res.locals.currUser._id)){
    req.flash("error","You are not the owner of listing!");
    return res.redirect(`/listing/${id}`);
  }
next();
}

module.exports.isReviewAuthor=async(req,res,next)=>{
  let {id,reviewId } = req.params;
  let review= await Review.findById(reviewId);
  ////before the delete listing checking listing owner and currUser are same or not .
  if(!review.author._id.equals(res.locals.currUser._id)){
    req.flash("error","You are not the author of this review!");
    return res.redirect(`/listing/${id}`);
  }
next();
}

module.exports.validateListing = ((req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  console.log(error);
  if (error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg);
  } else {
      next();
  }
})


module.exports.validateReview = ((req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  console.log(error);
  if (error) {
      let  errMsg= error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400, errMsg);
  } else {
      next();
  }
})