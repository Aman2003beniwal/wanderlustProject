 const express=require("express");

 const router=express.Router({mergeParams:true});

 const wrapAsync = require("../utlis/wrapAsync.js");
 const Review = require("../models/review.js");
 const Listing = require("../models/listing.js");
 const {validateReview, isLoggedIn, isReviewAuthor}=require("../middleware.js");


 const reviewController=require("../controllers/review.js");


 //// sending the request of review , 
// Post review route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReviews));

//// creating the delete review request
// delete review route 
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.deleteReview))

module.exports=router;