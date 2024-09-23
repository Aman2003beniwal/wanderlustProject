const Listing = require("../models/listing")


module.exports.index = async (req, res) => {
    let lists = await Listing.find({});
    //   console.log(lists);
    res.render("listing/index.ejs", { lists });
};


module.exports.renderNewForm = (req, res) => {
    res.render("listing/new.ejs");
}

module.exports.createListing = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    // console.log(url, "...", filename);
    const newListing = new Listing(req.body.listing);
    // console.log(req.user);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();
    req.flash("success", "New listing created!");
    res.redirect("/listing");
}

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    let data = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    // console.log(data);
    res.render("listing/show.ejs", { data });
}

module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    let data = await Listing.findById(id);
    let originalImgUrl=data.image.url;
    originalImgUrl=originalImgUrl.replace("/upload","/upload/w_250");
    res.render("listing/edit.ejs", { data ,originalImgUrl });
}


module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });//deconstructing the body of content and update the content of that is fatch by id .(... is a spread operator that is split the data )
    if (typeof req.file !=="undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }

    //  res.redirect("/listing");
    req.flash("success", "Listing Updated!");
    res.redirect(`/listing/${id}`);
}


module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    // console.log(deleteListing);
    req.flash("error", "Listing Deleted!");
    res.redirect("/listing");
}

