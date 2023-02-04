const express = require("express");
const router = express.Router();
const {getallblogs,postblog,updateblog,getblogbyid,deleteblog,getblogsbyuderid} = require("../controllers/blogc");


router.get("/",getallblogs);
router.get("/:id",getblogbyid);
router.post("/add",postblog);
router.put("/update/:id",updateblog);
router.delete("/delete/:id",deleteblog);
router.get("/user/:id",getblogsbyuderid)
module.exports = router;