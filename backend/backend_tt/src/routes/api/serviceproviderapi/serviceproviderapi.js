const express = require("express");
const { ServiceProvider } = require("../../../models/serviceproviders/serviceproviders");
const router= express.Router();

//post a request for serviceProvider
router.post("/",async(req,res,next)=>{
    const newRequest = new ServiceProvider(req.body);
    try{
        const savedRequest = await newRequest.save();
        res.status(200).json(savedRequest);
    }catch(err){
        next(err);
    }
})

module.exports = router;