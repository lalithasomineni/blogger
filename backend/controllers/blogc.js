const { default: mongoose } = require("mongoose");
const blog = require("../models/blog");
//const user = require("../models/user");
const User = require("../models/user")

exports.getallblogs = async (req,res)=>{
   let blogs;
   try{
     blogs = await blog.find();
     res.status(200).send(blogs);
   }
   catch{
    res.send("err")
   }
}
exports.postblog = async(req,res)=>{
 const {title,description,image,user} = req.body;
 let existinguser;
 try{
   existinguser = await User.findById(user);
 }
 catch(err){
    console.log(err);
 }
 if(!existinguser){
    console.log("error");
    res.send("no user")
 }
 const newblog = new blog({title,description,image,user});
 try{
    const session = await mongoose.startSession();
    session.startTransaction();
    await newblog.save();
    existinguser.blogs.push(newblog);
    await existinguser.save({session});
    session.commitTransaction();
    res.send(newblog)
 }
 catch(err){
    console.log(err)
 }
    
}
    
exports.updateblog = async(req,res)=>{
const {title,description} = req.body;
const id = req.params.id;
let Blog;
try{
   Blog =  await blog.findByIdAndUpdate(id,{
    title,
    description

})
console.log(Blog);
}
catch(err){
  return console.log(err);
  console.log(err);
}
if(!Blog){
    return res.status(404).send("blog not found")
}
else{
    return res.status(200).send(Blog);
}    
}

exports.getblogbyid = async(req,res)=>{
    const id = req.params.id;
    let Blog;
    try{
        Blog = await blog.findById(id);
    }
    catch(err){
        console.log(err)
    }
    if(!Blog){
        return res.status(404).send("blog not found")
    }
    return res.status(200).send(Blog)
}
exports.deleteblog = async(req,res)=>{
    const id = req.params.id;
    let Blog;
    try{
        Blog = await blog.findByIdAndRemove(id).populate('user');
        await user.blogs.pull(Blog);
        user.save();
    }
    catch(err){
        console.log(err);
    }
    if(!blog){
        return res.status(404).send("blog not found");
    }
    return res.status(200).send(Blog);
}

exports.getblogsbyuderid = async (req,res)=>{
    let Blogs;
    const userid = req.params.id;
    try{
        Blogs = await User.findById(userid).populate("blogs").select("blogs");
       // Blogs = await blog.find().where({user: req.params.user})
    }
    catch(err){
        console.log(err)
    }
    if(!Blogs){
        return res.status(200).send("sorry,currently there are no blogs on this userid")
    }
    return res.status(200).json({blogs:Blogs})
}