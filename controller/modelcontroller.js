const model = require("../models/model")
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
//create
exports.newcreate = async (req, res) => {
    const { name, username, password, phonenumber,email } = req.body
    try {
        const hashpassword = await bcrypt.hash(password, 15);
        const picture = req.file ? req.file.filename: null;
        const user = await model.create({ name, username, password: hashpassword, phonenumber, email, picture });
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
//view all
exports.viewall = async (req, res) => {
    try {
        const viewuser = await model.find();
        res.status(201).json(viewuser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

//singleview
exports.singleview = async (req, res) => {
    try {
        const singleuser = await model.findById(req.params.id);
        res.status(201).json(singleuser);
    }catch(err){
        res.status(400).json({error:err.message});
    }
}
//update user
exports.updateuser=async(req,res)=>{
    try{
    const { name, username, password, phonenumber,email } = req.body
    const update=await model.findByIdAndUpdate(req.params.id,{ name, username, password, phonenumber,email },{new:true})
    res.status(201).json(update);
    }catch(err){
        res.status(400).json({error:err.message});
    }
}
//delete user
exports.deleteuser=async(req,res)=>{
    try{
        await model.findByIdAndDelete(req.params.id);
        res.status(201).json({message:"user data successfully deleted"});
    }catch(err){
        res.status(400).json({error:err.message});
    }
}

//login user
exports.loggedin=async(req,res)=>{
    const {username,password}=req.body;
    try{
        const usercheck=await model.findOne({username});
        if(!usercheck) return res.status(400).json({message:"user not found"});
        const matching=await bcrypt.compare(password,usercheck.password);
        if(!matching) return res.status(400).json({message:"Invalid password"});
        const passkey=jwt.sign({userId:usercheck._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.status(201).json(passkey);
    }catch(err){
        res.status(400).json({error:err.message});
    }
}
