const express = require("express");
const { ServiceProvider } = require("../../../models/serviceproviders/serviceproviders");
const { createServiceProvider, getServiceProvider, getAllServiceProvider, updateServiceProvider, deleteServiceProvider } = require("../../../controllers/serviceproviders/serviceProviders");
const router= express.Router();

//post a request for serviceProvider
router.post("/",createServiceProvider);
router.get("/:id",getServiceProvider);
router.get("/all",getAllServiceProvider);
router.put("/:id",updateServiceProvider);
router.delete("/:id",deleteServiceProvider);


module.exports = router;