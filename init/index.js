const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main().then((res) => {
    console.log("successfully connection with mongodb");
}).catch((err) => {
    console.log(err);
});
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
}


////adding data in a mongodb , first delete alll the data of database then add new data ========================
const initDB = async ()=>{
    await Listing.deleteMany({});

    //// adding owner in over data
    initData.data= initData.data.map((obj)=>({...obj,owner:"66eac1842d973aebc6be02a4"}));
    await Listing.insertMany(initData.data); 
    console.log("Data was initilized..");
}
initDB();