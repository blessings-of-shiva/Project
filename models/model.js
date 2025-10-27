const mongoose=require("mongoose");
const AutoIncrement=require("mongoose-sequence")(mongoose);
const dbschema=new mongoose.Schema({
    name:{type:String,required:true},
    username:{type:String,required:true},
    password:{type:String,required:true,unique:true},
    phonenumber:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    date:{type:Date,default:Date.now()},
    picture:{type:String,default:null}
})
dbschema.plugin(AutoIncrement,{inc_field:"ID"});
module.exports=mongoose.model("schema",dbschema);