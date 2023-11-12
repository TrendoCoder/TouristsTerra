const express = require("express");
const router = express.Router();
const blogpostcontroller = require("../../../controllers/blog/blogcontroller");

//These routes get blogs
router.get('/blogs',blogpostcontroller.getAllBlogs)
router.get('/blog/:id',blogpostcontroller.getBlog)
router.get('/blogs/user/:userId', blogpostcontroller.getBlogsByUserId);

router.put("/like/:id",blogpostcontroller.likeDislikeBlog)
router.post('/:id/comment',blogpostcontroller.postCommentBlog)
router.get("/recentBlogs", blogpostcontroller.getRecentBlogs);

//These routes will be transfer to the admin portal
router.post("/createblogs", blogpostcontroller.createBlog);
router.delete("/:id", blogpostcontroller.deleteBlog);

router.put("/editblog/:id", blogpostcontroller.updateBlog);
module.exports = router;
