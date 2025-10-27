const express=require("express");
const dotenv=require("dotenv");
dotenv.config();
const cors=require("cors");
const modelrouter=require("./router/modelrouter");
const connectdb=require("./config/database");
const app=express();
app.use(express.json());
app.use(cors());
app.use("/api/user",modelrouter);
connectdb();
/*app.listen(process.env.PORT,()=>{
    console.log("server is running");
});*/
//for vercel
module.exports=app;
















