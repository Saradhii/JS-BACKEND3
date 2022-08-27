const User = require("../models/UserSchema");
const jwt = require("jsonwebtoken");
const Router = require("express");
const crypto = require("node:crypto");
const UserRoute = Router();


//User signup
UserRoute.post("/signup",(req,res)=>{
    const {name,email,password}=req.body;
    const hash = crypto.pbkdf2Sync(password,"SECRETSALT",60,64,"sha256").toString("hex");
    const user = new User({name,email,hash});
    user.save().then(()=>{
        res.send({message:"User created successfully"});
    });
})

//Getting single user
UserRoute.get("/singleuser/:id", async(req,res)=>{
    const singleuser = await User.find({"_id":req.params.id});
    res.send(singleuser);
})

//User login
UserRoute.post("/signin",async(req,res)=>{
    const {email , password} = req.body;
    const user = await User.findOne({email});
    const hash = crypto.pbkdf2Sync(password,"SECRETSALT",60,64,"sha256").toString("hex");
    if(hash !== user?.hash)
    {
        return res.send({message:"invalid cresentials"});
    }
    const token = jwt.sign({name:user?.name},'SECRET1234',{expiresIn: "30min"},);
    res.send({message: 'Logged in',token,user});
});

module.exports=UserRoute;