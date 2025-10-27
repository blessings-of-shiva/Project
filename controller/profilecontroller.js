const profile=require("../models/profile")
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
//signup
exports.createn=async(req,res)=>{
    /*try{
        const add=await profile.create(req.body)
        res.status(201).json(add);
    }catch(err){
        res.status(400).json({error:err.message});
    }*/
   
   try{
    const {input1,input2,input3,input4,input5}=req.body;
    const hashpasswordd=await bcrypt.hash(input1,15);
    const picture=req.file?req.file.filename:null;
    const use=new profile({input1:hashpasswordd,input2,input3,input4,input5,picture})
    await use.save();
    res.status(201).json(use)
   }catch(err){
    res.status(400).json({error:err.message});
   }
}
exports.loggedin=async(req,res)=>{
    const {username,password}=req.body;
    try{
        const finduser=await profile.findOne({username});
        if(!user) return res.status(400).json({message:"User not found"});
        const passwordmatch=await bcrypt.compare(password,finduser.password);
        if(!passwordmatch) return res.status(400).json({message:"invalid password"});
        const key=jwt.sign({userId:finduser._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.status(201).json(key);
    }catch(err){
        res.status(400).json({error:err.message})
    }
}
//view
exports.view=async(req,res)=>{
    try{
        const see=await profile.find()
        res.status(201).json(see);
    }catch(err){
        res.status(400).json({error:err.message})
    }
}
//update
exports.updating=async(req,res)=>{
    try{
        const {data1,data2,data3,data4,data5}=req.body;
        const picture=req.file?req.file.filename:null;
        const updateuser=await profile.findByIdAndUpdate(req.params.id,{data1,data2,data3,data4,data5,picture},{new:true});
        req.status(201).json(updateuser);
    }catch(err){
        res.status(201).json({error:err.message});
    }
}