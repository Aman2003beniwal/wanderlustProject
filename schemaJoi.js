//// this schema is for server side validation ==================================

////require the joi npm package for adding the validation for schema =================
const joi=require("joi");
const review = require("./models/review");

module.exports.listingSchema=joi.object({
listing:joi.object({
    title:joi.string().required(),
    description:joi.string().required(),
    price:joi.number().required().min(0),
    location:joi.string().required(),
    country:joi.string().required(),
    image:joi.string().allow("",null),
}).required()
});


module.exports.reviewSchema=joi.object({
    review:joi.object({
        rating:joi.number().required().min(0).max(5),
        comment: joi.string().required(),
    }).required()
}) 
