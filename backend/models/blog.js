const mongoose = require("mongoose");
const schema = mongoose.Schema;

const blogSchema = new schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:String,required:true},
    user:{type:mongoose.Types.ObjectId,required:true,ref:"User"}
})

module.exports = mongoose.model("blog",blogSchema);