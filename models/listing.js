const { ref } = require("joi");
const mongoose = require("mongoose");
const Review=require("./review.js");

const Schema= mongoose.Schema;

//// creating schema===========================================================
const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },

    image: {
        // type: String,
        // default:"https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        // // creating a default urll for image
        // set: (v) => v === "" ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" :(v),

        url:String,
        filename:String, 
    },
    price: {
        type: Number,
    },
    location: {
        type: String
    },
    country: {
        type: String
    },
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review", 
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
});


////  middleware for reviews , it call when we want to delete reviews and listing is also delete.
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id : { $in : listing.reviews}});
    }
});


////creating model==============================================================
const Listing = mongoose.model("Listing", listingSchema);

////export listing in a index.js================================================
module.exports = Listing;
   

