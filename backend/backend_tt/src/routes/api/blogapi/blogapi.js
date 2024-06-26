const express = require("express");
const router = express.Router();
const blogpostcontroller = require("../../../controllers/blog/blogcontroller");

//These routes get blogs
router.get('/blogs',blogpostcontroller.getAllBlogs)
router.get('/blog/:id',blogpostcontroller.getBlog)
router.get('/blogs/user/:userId', blogpostcontroller.getBlogsByUserId);
router.get("/recentBlogs", blogpostcontroller.getRecentBlogs);

router.put("/like/:id",blogpostcontroller.likeDislikeBlog)
router.post('/:id/comment',blogpostcontroller.postCommentBlog)
router.post('/blogs/:id/report', blogpostcontroller.reportBlog);

//These routes will be transfer to the admin portal
router.post("/createblogs", blogpostcontroller.createBlog);
router.delete("/:id", blogpostcontroller.deleteBlog);
router.put('/blog/:id', blogpostcontroller.updateBlog);

// router.get("/places/:cityName",blogpostcontroller.getAllPlaceData);
// router.get("/places/details/:placeId", blogpostcontroller.getPlaceDetails);

module.exports = router;
