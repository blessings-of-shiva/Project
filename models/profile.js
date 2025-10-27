const mongoose=require("mongoose")
const Autoincrement=require("mongoose-sequence")(mongoose);
const schema=new mongoose.Schema({
    input1:{type:String, required:true, unique:true},
    input2:{type:mongoose.Types.Decimal128, default:0.0},
    input3:{type:mongoose.Types.Decimal128, default:0.0},
    input4:{type:mongoose.Types.Decimal128, default:0.0},
    picture:{type:String,default:null},
    date:{type:Date,default:Date.now()}
})
schema.plugin(Autoincrement,{inc_field:"ID"});
module.exports=mongoose.model("schema",schema);