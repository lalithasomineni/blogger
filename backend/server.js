const express = require('express');
const app = express();
const mongoose = require("mongoose");
const userroute = require("./routes/user");
const blogroute = require("./routes/blog");

app.use(express.json());
mongoose.connect("mongodb+srv://admin:SFzmgqGjiLWLD97y@cluster0.rxpalan.mongodb.net/test").then((result)=>{
    console.log("connected to the db");
    app.listen(3000,()=>{
        console.log("listening to local host")
    })
}).catch((err)=>{
    console.log("err");
})
app.use("/",userroute)
app.use("/blogs",blogroute)

