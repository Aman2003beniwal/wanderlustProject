////destructing the listing
const express = require("express");
const router = express.Router("");

const wrapAsync = require("../utlis/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listing.js");
const multer  = require('multer')
const {storage}= require("../cloudConf.js");
const upload = multer({storage}); 

//// define route.route
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn,upload.single('listing[image]'),validateListing, wrapAsync(listingController.createListing))
 

////new & create route
router.get("/new", isLoggedIn, listingController.renderNewForm)

router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put( isLoggedIn, isOwner,upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn, isOwner, listingController.deleteListing)


////Update : edit and update route===================================================
////edit===============
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing));

module.exports = router;
