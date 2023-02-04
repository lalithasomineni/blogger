const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const Users = require("../models/user");
const bcrypt = require('bcrypt');
const saltRounds = 10;



exports.getallusers = async (req,res)=>{
   let users;
   try{
    users = await Users.find().then(result=>{
        res.json({result})
    })
   }
   catch{
    res.send("err")
   }
}

exports.usersignin = async (req,res)=>{
    let newUser = new Users({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        blogs: []
    });
    let duplicateUser = await Users.findOne().where({name:req.body.name});
    if(duplicateUser){
        return res.send("err")
        }
        try{
            bcrypt.hash(newUser.password, saltRounds, function(err, hash) {
                // Store hash in your password DB.
                newUser.password = hash;
               newUser.save();
                res.send(newUser);
            });
            }
            catch{
                res.send("failed")
            }
    
    }

exports.login = async (req,res)=>{
    let existinguser =await Users.findOne().where({email:req.body.email});
    console.log(existinguser);
    if(existinguser){
        let ismatch = await bcrypt.compare(req.body.password,existinguser.password);
            if(ismatch){
                res.send("logged in")
            }
            if(!ismatch){
                res.send("incorrect password")
            }

        //console.log(ismatch,req.body.password)
    }
    if(!existinguser){
    res.send("pls signup");
    }

}


