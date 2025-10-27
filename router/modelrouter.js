const express=require("express");
const router=express.Router();
const modelcontroller=require("../controller/modelcontroller");

//signup new entry path
router.post("/signup",modelcontroller.newcreate);
//login user
router.post("/login",modelcontroller.loggedin);
//viewall data
router.get("/finddata",modelcontroller.viewall);
//view single data
router.get("view/:id",modelcontroller.singleview);
//update user
router.put("/update/:id",modelcontroller.updateuser);
//delete user
router.delete("/delete/:id",modelcontroller.deleteuser);

module.exports=router