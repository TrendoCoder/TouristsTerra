const express = require("express");
const router = express.Router();
const explorecontroller = require("../../../controllers/explore/explorecontroller.js");


router.get("/places/:cityName", explorecontroller.getAllPlaceData);
router.get("/places/details/:placeId", explorecontroller.getPlaceDetails);

router.post('/travelCities', async (req, res) => {
    try {
        const { city1, city2 } = req.body;
        if (!city1 || !city2) {
            return res.status(400).json({ error: 'Both city names are required for the request.' });
        }

        // Call the explore controller to get suggestions
        const result = await explorecontroller.travelCities(city1, city2);
        const dataString = JSON.stringify(result.text);
        // res.send(dataString);



        return res.json(dataString);
    } catch (error) {
        // Log the error with additional information
        console.error('Error in /travelCities endpoint:', error);
        console.error('Request payload:', req.body);

        // Return a generic error message to the client
        return res.status(500).json({ error: 'Failed to process the request.' });
    }
});





module.exports = router;
