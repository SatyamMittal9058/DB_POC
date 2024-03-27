const express=require('express');
const router=express.Router();
const {getOpenPosition,executeOrder}=require("../controller/userDetail");
router.get("/openpositions",getOpenPosition);
router.post("/order",executeOrder);
module.exports=router;